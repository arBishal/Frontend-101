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
        subtitle="The same task, two approaches."
      />

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <p className="text-muted mb-4">
          Below is the same todo list built twice: once in vanilla JavaScript,
          once in React. The live list is at the top; under it, the two
          implementations sit side by side (tabbed on narrow screens). Before
          you read them: which version do you think is shorter, and by how much?
        </p>
        <FrameworkDemo />
      </div>

      <div className="text-muted space-y-3 text-sm lg:text-base">
        <SectionLabel>What to notice</SectionLabel>
        <p>
          The live demo is the same in both worlds: a todo list you can add to,
          complete, and delete. The code underneath is where they part ways.
        </p>
        <ul className="list-inside list-disc space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>Vanilla JS</strong>, about 70 lines: you create each DOM
            element, wire an event listener to every button, toggle classes and
            inline styles, remove nodes, and recount the total yourself. Roughly
            50 of those lines are the single &ldquo;add a todo&rdquo; handler.
          </li>
          <li>
            <strong>React</strong>, about 40 lines: you update an array in state
            and return JSX. Add, complete, and delete are three short functions,
            a dozen lines between them.
          </li>
        </ul>
        <p>
          Same behavior, less than half the hand-written wiring, and that gap
          only widens as the UI grows. The framework lets you spend your
          attention on <em className="text-body">what</em> to show instead of{" "}
          <em className="text-body">how</em> to update the page.
        </p>
        <Link
          href="/concepts/frameworks/landscape"
          className="text-strong inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          Next, explore the framework landscape
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
