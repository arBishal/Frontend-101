import { getConcept, conceptMetadata } from "@/app/lib/concepts";
import Takeaway from "@/app/components/ui/Takeaway";
import { Copy, TriangleAlert, Package } from "lucide-react";
import ComponentDemo from "./ComponentDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ConceptHeader from "@/app/components/ConceptHeader";
import ProblemCards from "@/app/components/ProblemCards";

const problems = [
  {
    icon: Copy,
    title: "Edit it eight times",
    description:
      "Ship a copy-pasted card in eight places, then get asked to add one line of text to it. That is eight separate edits, and eight chances to fat-finger one.",
  },
  {
    icon: TriangleAlert,
    title: "The one you missed",
    description:
      "The single copy you forget renders last month's design right next to this month's.",
  },
  {
    icon: Package,
    title: "Rebuilt from scratch",
    description:
      "New features should start from pieces you already trust. Without a shared library, each one rebuilds its own modal from scratch, and the tenth still carries bugs the first nine already fixed.",
  },
];

export const metadata = conceptMetadata("components");
const concept = getConcept("components");

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader title={concept.title} subtitle={concept.description} />

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>What is a component?</SectionLabel>
        <p>
          A component is a self-contained, reusable piece of UI. Instead of
          writing one massive page top to bottom, you break the interface into
          smaller parts and build each one once. A comment box is a component:
          the avatar, the text field, the post button, and the logic tying them
          together, packaged under a single name you can drop in anywhere.
        </p>
        <p>
          Think of components like LEGO bricks, but notice{" "}
          <em className="text-zinc-700 dark:text-zinc-300">why</em> they snap
          together. It is the stud, one standardized bump every brick agrees on,
          so a piece from one set fits a piece from another. A component’s{" "}
          <span className="italic text-zinc-700 dark:text-zinc-300">props</span>{" "}
          are that stud: the small, agreed-on set of inputs it accepts.
          Anything can use the component by supplying those inputs, without
          knowing a thing about what is inside it.
        </p>
        <p>
          So a{" "}
          <code className="text-zinc-800 dark:text-zinc-200">&lt;Button&gt;</code>{" "}
          might accept a{" "}
          <code className="text-zinc-800 dark:text-zinc-200">variant</code> prop
          to switch between “primary” and “outline”
          looks. Same component, supplied different props, rendering a different
          result each time. Write it once; reuse it four times in a grid with
          four different labels.
        </p>
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          Picture styling a Submit button forty times across an app by hand. A
          request comes in to round the corners. You change it in twelve files,
          ship, and a screenshot comes back with three square buttons still
          sitting in the checkout flow. That is the tax on copy-pasted markup:
          every change is a manual hunt, and the copies you miss are the ones
          users find.
        </p>
        <p>
          Define that button once as a component and the math flips: you change
          the definition, and every place that uses it updates at once. This is
          the DRY principle (Don’t Repeat Yourself) applied to your UI, and
          it is how design systems work, a shared library of trusted pieces that
          the whole app pulls from instead of reinventing.
        </p>
        <ProblemCards problems={problems} />
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Before you touch it: if you switch{" "}
          <code className="text-zinc-800 dark:text-zinc-200">border-radius</code>{" "}
          to pill, how many of the three buttons change, and how many CSS rules
          does it take? Toggle{" "}
          <code className="text-zinc-800 dark:text-zinc-200">disabled</code> per
          button and edit the shared style, then read the two code panels.
        </p>
        <ComponentDemo />
        <p className="text-zinc-700 dark:text-zinc-300 mt-6 mb-2">Try breaking it:</p>
        <ul className="list-disc list-inside space-y-1.5 text-zinc-600 dark:text-zinc-400">
          <li>
            Set border-radius to square. The three buttons carry different
            variants and labels, so why does this one edit reshape all of them at
            once?
          </li>
          <li>
            Disable just the outline button. Only its line in the JSX gains{" "}
            <code className="text-zinc-800 dark:text-zinc-200">disabled</code>;
            the other two are untouched. Same component, different props.
          </li>
          <li>
            Disable all three. They are still one component. You changed three
            props, not three buttons.
          </li>
        </ul>
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>How it works</SectionLabel>
        <p>
          Toggle{" "}
          <code className="text-zinc-800 dark:text-zinc-200">disabled</code> on
          any row of the Props Inspector, or change{" "}
          <code className="text-zinc-800 dark:text-zinc-200">border-radius</code>{" "}
          and size in the Style Editor. The live buttons and both code panels
          update together: the JSX (React’s HTML-in-JavaScript syntax) on
          one side, the CSS on the other.
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li><strong>variant</strong>: controls the visual style (solid, outline, ghost)</li>
          <li><strong>disabled</strong>: blocks interaction per instance</li>
          <li><strong>border-radius / size</strong>: shared CSS that applies to every instance at once</li>
        </ul>
        <p>
          The split between the two editors is the thing to notice.{" "}
          <code className="text-zinc-800 dark:text-zinc-200">disabled</code> is a
          prop, set per instance, so you can switch off one button and leave the
          rest alone. Border-radius lives in the shared style every instance
          reads, so one edit moves all three. Props vary from one use to the
          next; the definition underneath stays the same.
        </p>
        <p>
          Props are inputs passed in from outside. When a piece of UI needs to
          remember something on its own, that is{" "}
          <a
            href="/concepts/state"
            className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            state
          </a>
          , the next concept.
        </p>
      </div>

      <Takeaway>
        Define a piece of UI once, give it a few inputs, and reuse it
        everywhere, so one change updates every copy.
      </Takeaway>
    </div>
  );
}
