import { getConcept, conceptMetadata } from "@/app/lib/concepts";
import Link from "next/link";
import { ArrowRight, MousePointerClick, RefreshCw, Puzzle, Route } from "lucide-react";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ConceptHeader from "@/app/components/ConceptHeader";
import ProblemCards from "@/app/components/ProblemCards";

export const metadata = conceptMetadata("frameworks");
const concept = getConcept("frameworks");

const problems = [
  {
    icon: MousePointerClick,
    title: "DOM Manipulation",
    description:
      "Manually creating, updating, and removing HTML elements is tedious and error-prone. Frameworks do it automatically.",
  },
  {
    icon: RefreshCw,
    title: "State \u2194 UI Sync",
    description:
      "When data changes, the UI must update. Frameworks track this relationship so you don\u2019t have to.",
  },
  {
    icon: Puzzle,
    title: "Component Reuse",
    description:
      "Build a button once, use it everywhere. Frameworks make composition natural.",
  },
  {
    icon: Route,
    title: "Routing & Structure",
    description:
      "Multi-page apps need navigation, layouts, data loading. Frameworks provide conventions for all of this.",
  },
];

export default function FrameworksPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader title={concept.title} subtitle={concept.description} />

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>What is a framework?</SectionLabel>
        <p>
          A framework is a pre-built foundation that handles the repetitive,
          error-prone parts of building UIs &mdash; DOM updates, state
          management, routing, event handling.
        </p>
        <p>
          Instead of telling the browser <em>how</em> to update the page step by
          step, you describe <em>what</em> the UI should look like. The
          framework figures out the rest.
        </p>
        <p>
          Think of it this way: writing vanilla HTML and JavaScript is like
          giving turn-by-turn directions. A framework is like saying &ldquo;take
          me to the airport&rdquo; &mdash; it handles the route.
        </p>
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          Without a framework, you&rsquo;d manually create, update, and remove
          HTML elements every time data changes. For a simple counter
          that&rsquo;s manageable. For a real app with forms, navigation, and
          live data, it quickly becomes a tangled mess of DOM manipulation.
        </p>
        <p>
          Frameworks solve this by keeping your UI in sync with your data
          automatically. They also give you component reuse, routing
          conventions, and structure &mdash; so you&rsquo;re not reinventing the
          wheel every time you start a project.
        </p>
        <ProblemCards problems={problems} className="sm:grid-cols-2 gap-4" />
        <p>
          Frameworks aren&rsquo;t magic &mdash; they&rsquo;re JavaScript
          libraries with smart abstractions. This entire site is built with{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">Next.js</strong>,
          which is built on{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">React</strong>.
        </p>
        <Link
          href="/concepts/frameworks/see-the-diff"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline"
        >
          See the difference for yourself
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
