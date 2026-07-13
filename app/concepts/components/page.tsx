import type { Metadata } from "next";
import ComponentDemo from "./ComponentDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Components | Frontend 101",
  description: "Why we build UIs out of reusable pieces.",
};

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Components
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Why we build UIs out of reusable pieces.
        </p>
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <ComponentDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>How it works</SectionLabel>
        <p>
          Components are reusable, self-contained pieces of UI. Instead of
          writing one giant page, you break the interface into smaller parts —
          a sidebar, a top bar, stat cards, a table — each responsible for its
          own structure and style.
        </p>
        <p>
          The dashboard above is built from distinct components. Click
          &ldquo;Show Components&rdquo; to toggle X-ray mode and see where each
          component begins and ends.
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li><strong>Navbar</strong> — logo and nav links</li>
          <li><strong>Sidebar</strong> — icon-based navigation rail</li>
          <li><strong>Stat Card</strong> — repeated four times in a grid</li>
          <li><strong>Table</strong> — header row + data rows</li>
          <li><strong>Footer</strong> — site info and tagline</li>
        </ul>
        <p>
          Notice how components can be nested: the Sidebar sits alongside
          the main content area, and Stat Cards repeat inside a grid. This composability is what makes
          component-based UIs powerful — you build small pieces and combine them
          into complex interfaces.
        </p>
      </div>
    </div>
  );
}
