import { getConcept, conceptMetadata } from "@/app/lib/concepts";
import Takeaway from "@/app/components/ui/Takeaway";
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
    title: "DOM manipulation",
    description:
      "Creating, updating, and removing HTML elements by hand is tedious and easy to get wrong. A framework does it for you.",
  },
  {
    icon: RefreshCw,
    title: "State to UI sync",
    description:
      "When the data changes, the screen has to change with it. Frameworks track that relationship so you never wire it up yourself.",
  },
  {
    icon: Puzzle,
    title: "Component reuse",
    description:
      "Build a button once, use it everywhere.",
  },
  {
    icon: Route,
    title: "Routing and structure",
    description:
      "Real apps need navigation, shared layouts, and data loading. Rather than invent conventions for each one, you inherit a set that already works.",
  },
];

export default function FrameworksPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader title={concept.title} subtitle={concept.description} />

      <div className="text-sm lg:text-base text-muted space-y-3">
        <SectionLabel>What is a framework?</SectionLabel>
        <p>
          Writing vanilla HTML and JavaScript is like giving a driver
          turn-by-turn directions: turn here, update this element, now remove
          that one. A framework is like getting in and saying “take me to
          the airport.” You say where you want to end up, and it handles
          the route.
        </p>
        <p>
          That is what a framework is: a pre-built foundation that handles the
          repetitive, error-prone parts of building a UI, from DOM updates to
          state management to routing. Instead of telling the browser{" "}
          <em className="text-body">how</em> to change the
          page step by step, you describe{" "}
          <em className="text-body">what</em> it should
          look like, and the framework works out the steps.
        </p>
      </div>

      <div className="text-sm lg:text-base text-muted space-y-3">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          Without a framework, you create, update, and remove HTML elements by
          hand every time the data changes. For a lone counter that is fine. For
          a real app juggling forms, navigation, and live data, it turns into a
          tangle of DOM code where every new feature risks breaking the last.
        </p>
        <p>
          A framework is not magic. Under the hood it is a JavaScript library
          with a well-chosen set of abstractions that keep the UI in step with
          the data and hand you reusable structure instead of a blank page. This
          entire site runs on{" "}
          <strong className="text-strong">Next.js</strong>,
          which is built on{" "}
          <strong className="text-strong">React</strong>.
        </p>
        <ProblemCards problems={problems} className="sm:grid-cols-2 gap-4" />
        <Takeaway>
          A framework keeps your UI in sync with your data, so you describe what
          the screen should show instead of writing every step to update it.
        </Takeaway>
        <Link
          href="/concepts/frameworks/see-the-diff"
          className="inline-flex items-center gap-2 text-sm font-medium text-strong hover:underline"
        >
          See the difference for yourself
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
