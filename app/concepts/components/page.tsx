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

      <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>What is a component?</SectionLabel>
        <p>
          A component is a self-contained, reusable piece of UI. Instead of
          writing one massive page, you break the interface into smaller parts:
          a button, a card, and a sidebar, each responsible for its own markup
          and style.
        </p>
        <p>
          Think of components like LEGO bricks. Each brick has a specific shape
          and purpose, but you can snap them together in countless combinations
          to build something complex. A single <code className="text-zinc-800 dark:text-zinc-200">&lt;StatCard&gt;</code> component can be
          reused four times in a grid, with the same structure but different data.
        </p>
        <p>
          Components accept <span className="italic text-zinc-700 dark:text-zinc-300">props</span>, inputs that let you
          customize what they render. A <code className="text-zinc-800 dark:text-zinc-200">&lt;Button&gt;</code> component might
          accept a <code className="text-zinc-800 dark:text-zinc-200">variant</code> prop to switch between &ldquo;primary&rdquo; and
          &ldquo;outline&rdquo; styles. Same component, different look, zero code duplication.
        </p>
      </div>

      <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          Without components, you&rsquo;d copy-paste the same HTML everywhere.
          Need to change how a card looks? Update it in every single place. Miss
          one? You have a visual inconsistency.
        </p>
        <p>
          With components, you change the code once and every instance updates
          automatically. This is the DRY principle (Don&rsquo;t Repeat Yourself)
          applied to your UI. It&rsquo;s also how every modern design system
          works: teams build a shared library of components (buttons, modals,
          form fields) that the entire app consumes.
        </p>
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
          The same{" "}
          <code className="text-zinc-700 dark:text-zinc-300">Button</code>{" "}
          component rendered three times, once per variant. Toggle{" "}
          <code className="text-zinc-700 dark:text-zinc-300">disabled</code>{" "}
          per instance and watch the JSX update in real time.
        </p>
        <ComponentDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>How it works</SectionLabel>
        <p>
          The demo renders the same{" "}
          <code className="text-zinc-800 dark:text-zinc-200">&lt;Button&gt;</code>{" "}
          component three times, once per variant. The code view below the
          preview shows the actual JSX: the same component name appears on
          every line, with only the{" "}
          <code className="text-zinc-800 dark:text-zinc-200">variant</code> prop changing.
        </p>
        <p>
          The Style Editor changes the shared CSS that all three instances
          consume. Switch{" "}
          <code className="text-zinc-800 dark:text-zinc-200">border-radius</code>{" "}
          to pill and every button updates simultaneously; the CSS tab shows the
          single rule that changed. That&rsquo;s the core promise of components:
          one definition, many instances, and a single change propagates
          everywhere.
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li><strong>variant</strong>: controls the visual style (solid, outline, ghost)</li>
          <li><strong>disabled</strong>: blocks interaction per instance</li>
          <li><strong>border-radius / size</strong>: shared CSS that applies to every instance at once</li>
        </ul>
      </div>
    </div>
  );
}
