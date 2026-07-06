"use client";

import { useEffect, useState } from "react";

const breakpoints = [
  { name: "mobile", maxWidth: 639, label: "< 640px" },
  { name: "tablet", maxWidth: 1023, label: "640px - 1023px" },
  { name: "desktop", maxWidth: Infinity, label: "1024px+" },
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

  const bp = windowWidth ? getBreakpoint(windowWidth) : null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Responsive Design
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Responsive layouts adapt to the screen size. Resize your browser window
          and watch the layout and breakpoint indicator change in real time.
        </p>
      </div>

      {/* Breakpoint indicator */}
      <div className="mb-8 rounded border border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Breakpoint
          </span>
          {bp && (
            <span className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {bp.name}{" "}
              <span className="text-zinc-400 dark:text-zinc-500">
                ({bp.label})
              </span>
            </span>
          )}
        </div>
        {windowWidth && (
          <p className="mt-1 font-mono text-xs text-zinc-400 dark:text-zinc-500">
            window.innerWidth = {windowWidth}px
          </p>
        )}
      </div>

      {/* Sample layout demo */}
      <div className="rounded border border-zinc-200 dark:border-zinc-800 p-4">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
          Sample layout
        </p>

        {/* Mock navbar */}
        <div className="rounded bg-zinc-100 dark:bg-zinc-800 p-3 mb-3 flex items-center justify-between">
          <div className="font-mono text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Navbar
          </div>
          <div className="hidden sm:flex gap-2">
            <div className="h-2 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-2 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-2 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </div>
        </div>

        {/* Mock hero */}
        <div className="rounded bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-6 mb-3 text-center">
          <div className="h-3 w-32 mx-auto rounded-full bg-zinc-300 dark:bg-zinc-600 mb-2" />
          <div className="h-2 w-48 mx-auto rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>

        {/* Mock cards — responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded border border-zinc-200 dark:border-zinc-700 p-4"
            >
              <div className="h-2.5 w-16 rounded-full bg-zinc-300 dark:bg-zinc-600 mb-2" />
              <div className="space-y-1.5">
                <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-2 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Mock footer */}
        <div className="rounded bg-zinc-100 dark:bg-zinc-800 p-3 text-center">
          <div className="h-2 w-24 mx-auto rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-8 rounded border border-zinc-200 dark:border-zinc-800 p-4 text-sm text-zinc-600 dark:text-zinc-400 space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          How it works
        </p>
        <p>
          CSS breakpoints let you apply different styles based on the viewport
          width. The sample layout above uses three breakpoints:
        </p>
        <ul className="list-disc list-inside space-y-1 font-mono text-xs">
          <li>
            <strong>mobile</strong> — single column, nav links hidden
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
          The breakpoint indicator at the top reads{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
            window.innerWidth
          </code>{" "}
          live and shows which breakpoint is currently active.
        </p>
      </div>
    </div>
  );
}
