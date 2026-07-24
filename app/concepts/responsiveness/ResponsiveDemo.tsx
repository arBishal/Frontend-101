"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import Button from "@/app/components/ui/Button";
import { useResizable } from "@/app/lib/useResizable";
import { cn } from "@/app/lib/cn";

const PRESETS = [
  { label: "Mobile", icon: Smartphone, range: "< 512px", width: 320 },
  { label: "Tablet", icon: Tablet, range: "512 - 895px", width: 640 },
  { label: "Desktop", icon: Monitor, range: "896px+", width: Infinity },
] as const;

const MIN_WIDTH = 280;

export default function ResponsiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [maxWidth, setMaxWidth] = useState(1200);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    function updateMax() {
      if (containerRef.current?.parentElement) {
        const newMax = containerRef.current.parentElement.clientWidth;
        setMaxWidth(newMax);
        setWidth((prev) => {
          if (prev === null || isDesktop) return newMax;
          return Math.min(prev, newMax);
        });
      }
    }
    updateMax();
    window.addEventListener("resize", updateMax);
    return () => window.removeEventListener("resize", updateMax);
  }, [isDesktop]);

  const handlePresetClick = useCallback((presetWidth: number) => {
    if (presetWidth === Infinity) {
      setIsDesktop(true);
      setWidth(maxWidth);
    } else {
      setIsDesktop(false);
      setWidth(Math.min(presetWidth, maxWidth));
    }
  }, [maxWidth]);

  const onResize = useCallback((clamped: number) => {
    setWidth(clamped);
    setIsDesktop(clamped === maxWidth);
  }, [maxWidth]);

  const displayWidth = width ?? maxWidth;

  const { isDragging, handlePointerDown, handleKeyDown } = useResizable({
    containerRef,
    maxWidth,
    minWidth: MIN_WIDTH,
    width: displayWidth,
    onResize,
  });

  function getActivePreset() {
    const w = width ?? maxWidth;
    if (w >= 896) return "Desktop";
    if (w >= 512) return "Tablet";
    return "Mobile";
  }

  const activePreset = getActivePreset();

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {PRESETS.map(({ label, icon: Icon, range, width: presetWidth }) => (
          <Button
            key={label}
            variant={activePreset === label ? "solid" : "outline"}
            onClick={() => handlePresetClick(presetWidth)}
            className="text-sm px-3 py-2 justify-center sm:justify-start"
          >
            <Icon className="size-4" />
            {label}
            <span className="font-mono text-xs opacity-60">
              {range}
            </span>
          </Button>
        ))}
      </div>

      {/* Width indicator */}
      <div>
        <p className="font-mono uppercase tracking-wide text-xs font-medium text-subtle mb-1">
          Viewport width
        </p>
        <span className="font-mono text-xl md:text-2xl font-medium text-strong tabular-nums">
          {displayWidth}px
        </span>
      </div>

      {/* Resizable preview */}
      <div ref={containerRef} className="relative">
        <div
          className="@container relative overflow-hidden rounded-lg border border-default transition-colors"
          style={{ width: isDesktop ? "100%" : displayWidth, maxWidth: "100%" }}
        >
          {/* Preview content */}
          <div className="p-4 space-y-3">
            {/* Mock navbar */}
            <div className="rounded-lg bg-inset px-4 py-3 flex items-center justify-between">
              <div className="size-5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
              {/* Nav links — shown once the container is wide enough */}
              <div className="hidden @lg:flex gap-2.5">
                <div className="h-2 w-10 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <div className="h-2 w-10 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <div className="h-2 w-10 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              </div>
              {/* Hamburger — collapses in on narrow containers */}
              <div className="space-y-1 @lg:hidden">
                <div className="h-0.5 w-3.5 bg-zinc-400 dark:bg-zinc-500" />
                <div className="h-0.5 w-3.5 bg-zinc-400 dark:bg-zinc-500" />
                <div className="h-0.5 w-3.5 bg-zinc-400 dark:bg-zinc-500" />
              </div>
            </div>

            {/* Mock hero */}
            <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-default px-5 py-8 text-center space-y-2.5">
              <div className="h-3.5 w-1/3 mx-auto rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <div className="h-2 w-2/3 mx-auto rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-2 w-1/2 mx-auto rounded-full bg-zinc-300 dark:bg-zinc-700" />
            </div>

            {/* Mock cards — 1 / 2 / 3 columns driven by container width */}
            <div className="grid gap-3 grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-lg bg-inset p-4 space-y-2.5"
                >
                  <div className="h-2.5 w-14 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                  <div className="h-2 w-full rounded-full bg-zinc-300 dark:bg-zinc-700" />
                </div>
              ))}
            </div>

            {/* Mock footer */}
            <div className="rounded-lg bg-inset px-4 py-4 flex flex-col @lg:flex-row items-center justify-between gap-3">
              <div className="h-2 w-16 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <div className="flex gap-2.5">
                <div className="h-2 w-8 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <div className="h-2 w-8 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <div className="h-2 w-8 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              </div>
            </div>
          </div>

        </div>
        {/* Drag handle — positioned at the preview's right edge */}
        <div
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
          role="separator"
          tabIndex={0}
          aria-label="Resize preview"
          aria-orientation="vertical"
          aria-valuenow={displayWidth}
          aria-valuemin={MIN_WIDTH}
          aria-valuemax={maxWidth}
          aria-valuetext={`${displayWidth} pixels`}
          className="absolute top-0 h-full w-4 flex items-center justify-center cursor-col-resize group rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 dark:focus-visible:ring-zinc-400"
          style={{ left: (isDesktop ? maxWidth : displayWidth) - 8 }}
        >
          <div
            className={cn(
              "h-12 w-1.5 rounded-full transition-colors",
              isDragging
                ? "bg-zinc-900 dark:bg-zinc-100"
                : "bg-zinc-300 dark:bg-zinc-600 group-hover:bg-zinc-500 dark:group-hover:bg-zinc-400 group-focus-visible:bg-zinc-900 dark:group-focus-visible:bg-zinc-100"
            )}
          />
        </div>
      </div>
    </div>
  );
}
