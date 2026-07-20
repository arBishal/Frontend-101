import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FrameworkDemo from "./FrameworkDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ConceptHeader from "@/app/components/ConceptHeader";

export const metadata: Metadata = {
  title: "See the Difference | Frontend 101",
  description: "The same task, two approaches.",
};

export default function SeeTheDiffPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader
        title="See the Difference"
        subtitle="The same task, two approaches. Toggle between vanilla JavaScript and React to see how a framework changes the experience."
      />

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <FrameworkDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>What to notice</SectionLabel>
        <p>
          The live demo above is identical in both modes &mdash; a todo list
          where you can add, complete, and delete items. But look at the code
          underneath:
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>Vanilla JS</strong> &mdash; you manually create DOM
            elements, wire up event listeners for each button, toggle classes
            and styles, remove nodes, and update the counter yourself
          </li>
          <li>
            <strong>React</strong> &mdash; you update an array in state and
            return JSX. Adding, toggling, and deleting are one-liners.
          </li>
        </ul>
        <p>
          This gap only grows as the UI gets more complex. Frameworks let you
          focus on <em>what</em> to show instead of <em>how</em> to update the
          page.
        </p>
        <Link
          href="/concepts/frameworks/landscape"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline"
        >
          Next, explore the framework landscape
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
