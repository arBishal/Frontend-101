"use client";

import { useEffect, useState } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";

const breakpoints = [
  { name: "mobile", maxWidth: 639, label: "< 640px", icon: Smartphone },
  { name: "tablet", maxWidth: 1023, label: "640px - 1023px", icon: Tablet },
  { name: "desktop", maxWidth: Infinity, label: "1024px+", icon: Monitor },
] as const;

function getBreakpoint(width: number) {
  return breakpoints.find((bp) => width <= bp.maxWidth)!;
}

export default function ResponsivenessPage() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeBp = windowWidth ? getBreakpoint(windowWidth) : null;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Responsive Design
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Responsive layouts adapt to the screen size. Resize your browser window
          and watch everything change in real time.
        </p>
      </div>

      {/* Breakpoint indicator */}
      <div className="mb-10">
        <p className="font-mono text-sm uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
          Current breakpoint
        </p>
        <div className="grid grid-cols-3 gap-3">
          {breakpoints.map((bp) => {
            const isActive = activeBp?.name === bp.name;
            const Icon = bp.icon;

            return (
              <div
                key={bp.name}
                className={`relative rounded-lg border p-4 text-center transition-all ${
                  isActive
                    ? "border-zinc-400 dark:border-zinc-500 bg-zinc-100 dark:bg-zinc-800"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <Icon
                  className={`size-6 mx-auto mb-2 ${
                    isActive
                      ? "text-zinc-700 dark:text-zinc-200"
                      : "text-zinc-300 dark:text-zinc-600"
                  }`}
                />
                <p
                  className={`font-mono text-sm font-medium ${
                    isActive
                      ? "text-zinc-700 dark:text-zinc-200"
                      : "text-zinc-400 dark:text-zinc-500"
                  }`}
                >
                  {bp.name}
                </p>
                <p
                  className={`font-mono text-xs mt-0.5 ${
                    isActive
                      ? "text-zinc-500 dark:text-zinc-400"
                      : "text-zinc-300 dark:text-zinc-700"
                  }`}
                >
                  {bp.label}
                </p>
              </div>
            );
          })}
        </div>
        {windowWidth && (
          <p className="mt-3 font-mono text-xs text-zinc-400 dark:text-zinc-500 text-center">
            window.innerWidth = {windowWidth}px
          </p>
        )}
      </div>

      {/* Sample layout demo */}
      <div className="mb-10">
        <p className="font-mono text-sm uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
          Sample layout
        </p>

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 space-y-4">
          {/* Mock navbar */}
          <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-5 py-4 flex items-center justify-between">
            <div className="font-mono text-xs font-medium text-zinc-600 dark:text-zinc-300">
              Logo
            </div>
            <div className="hidden sm:flex gap-3">
              <div className="h-2.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="h-2.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="h-2.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <div className="sm:hidden">
              <div className="space-y-1">
                <div className="h-0.5 w-4 bg-zinc-400 dark:bg-zinc-500" />
                <div className="h-0.5 w-4 bg-zinc-400 dark:bg-zinc-500" />
                <div className="h-0.5 w-4 bg-zinc-400 dark:bg-zinc-500" />
              </div>
            </div>
          </div>

          {/* Mock hero */}
          <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 px-6 py-10 text-center space-y-3">
            <div className="h-4 w-40 mx-auto rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-2.5 w-56 mx-auto rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-2.5 w-44 mx-auto rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>

          {/* Mock cards — responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-5 space-y-3"
              >
                <div className="h-3 w-16 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
            ))}
          </div>

          {/* Mock footer */}
          <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="h-2.5 w-20 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex gap-3">
              <div className="h-2.5 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="h-2.5 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="h-2.5 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-3">
        <p className="font-mono text-sm uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          How it works
        </p>
        <p>
          CSS breakpoints let you apply different styles based on the viewport
          width. The sample layout above uses three breakpoints:
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs">
          <li>
            <strong>mobile</strong> — single column, nav links collapse to hamburger icon
          </li>
          <li>
            <strong>tablet</strong> (640px+) — two-column card grid, nav links visible
          </li>
          <li>
            <strong>desktop</strong> (1024px+) — three-column card grid
          </li>
        </ul>
        <p>
          Resize the browser to see the layout shift between these breakpoints.
          The indicator above highlights which breakpoint is currently active.
        </p>
      </div>
    </div>
  );
}
