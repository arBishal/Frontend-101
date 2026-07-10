import type { Metadata } from "next";
import ResponsiveDemo from "./ResponsiveDemo";

export const metadata: Metadata = {
  title: "Responsive Design | Frontend 101",
  description: "Responsive layouts adapt to the screen size.",
};

export default function ResponsivenessPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Responsive Design
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Drag, tap, or resize to see how layouts adapt to different screen
          sizes.
        </p>
      </div>

      <div>
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-500 dark:text-zinc-300 mb-4">
          Interactive demo
        </p>
        <ResponsiveDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-500 dark:text-zinc-300">
          How it works
        </p>
        <p>
          CSS breakpoints let you apply different styles based on the viewport
          width. The preview above simulates this by letting you control the
          container width directly.
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>mobile</strong> — single column, hamburger menu, stacked
            footer
          </li>
          <li>
            <strong>tablet</strong> (640px+) — two-column grid, nav links
            visible, inline footer
          </li>
          <li>
            <strong>desktop</strong> (1024px+) — three-column grid, full width
          </li>
        </ul>
        <p>
          Use the device buttons to snap to common sizes, or drag the handle on
          the right edge to resize freely and watch the layout adapt.
        </p>
      </div>
    </div>
  );
}
