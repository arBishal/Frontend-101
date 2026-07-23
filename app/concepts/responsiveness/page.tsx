import { getConcept, conceptMetadata } from "@/app/lib/concepts";
import { TabletSmartphone, Hand, Layers } from "lucide-react";
import ResponsiveDemo from "./ResponsiveDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ConceptHeader from "@/app/components/ConceptHeader";
import ProblemCards from "@/app/components/ProblemCards";
import CodeBlock from "@/app/components/ui/CodeBlock";

const problems = [
  {
    icon: TabletSmartphone,
    title: "Off the edge",
    description:
      "Your signup form is perfect on a laptop. On a phone the submit button sits past the right edge, and no amount of scrolling down brings it into reach.",
  },
  {
    icon: Hand,
    title: "Fat-finger taps",
    description:
      "Links spaced for a mouse cursor land a thumb-width too close, so every tap catches the wrong one.",
  },
  {
    icon: Layers,
    title: "Fixed twice, or not at all",
    description:
      "A separate mobile site means every fix happens twice. You patch the broken nav link on desktop, ship it, and a week later a phone user hits the same dead link, because the mobile copy never got the change.",
  },
];

export const metadata = conceptMetadata("responsiveness");
const concept = getConcept("responsiveness");

export default function ResponsivenessPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader title={concept.title} subtitle={concept.description} />

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>What is responsive design?</SectionLabel>
        <p>
          You built a three-column dashboard that looks sharp on a 27-inch
          monitor. A teammate opens it on their phone: the third column runs off
          the right edge, the headings wrap to one word per line, and they close
          the tab. Responsive design is what keeps that from happening.
        </p>
        <p>
          It is a single codebase whose layout reshapes itself to the width it is
          given. Instead of building a phone version and a desktop version, you
          write one set of HTML and CSS that reorganizes itself based on the
          space available. The core tool is the{" "}
          <span className="italic text-zinc-700 dark:text-zinc-300">breakpoint</span>:
          a CSS rule that says &ldquo;once the screen is wider than X pixels,
          apply these styles.&rdquo; Below that width a different set takes over.
          That is how a three-column grid collapses into a single-column stack
          without touching the HTML.
        </p>
        <p>
          The word &ldquo;responsive&rdquo; misleads a lot of beginners into
          thinking something detects the phone and loads a separate mobile site.
          Nothing detects anything. There is no second site and no JavaScript
          checking the screen; the same CSS simply reacts to how much width it
          currently has to work with.
        </p>
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          More than half of all web traffic is on phones. A layout that only
          holds together on a desktop monitor doesn&rsquo;t just look off on a
          phone; it quietly locks out most of the people trying to use what you
          built.
        </p>
        <p>
          A responsive codebase isn&rsquo;t a bonus feature, it&rsquo;s the
          expected baseline, and it is far cheaper to live with than two sites
          that drift apart every time someone ships a change to one and forgets
          the other.
        </p>
        <ProblemCards problems={problems} />
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Before you drag: at what width do you think the three columns give up
          and drop to two? Grab the handle on the right edge, resize the preview,
          and find the pixel where it happens.
        </p>
        <ResponsiveDemo />
        <p className="text-zinc-700 dark:text-zinc-300 mt-6 mb-2">Try breaking it:</p>
        <ul className="list-disc list-inside space-y-1.5 text-zinc-600 dark:text-zinc-400">
          <li>
            Drag from wide to narrow and watch the nav links vanish into a
            hamburger and the columns fold from three to two to one. Which
            breakpoint also switches the footer from a row to a stack?
          </li>
          <li>
            Cross 512px slowly. The jump from one column to two happens in a
            single pixel step, not a smooth slide. That step is the breakpoint.
          </li>
          <li>
            Park the width at 900px, then nudge below 896. The third column
            disappears. That 896 line is a choice, not a law: you decide where
            the layout should change.
          </li>
        </ul>
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>How it works</SectionLabel>
        <p>
          Use the device buttons to snap to common sizes, or drag the handle on
          the right edge to resize freely and watch the layout reflow. The width
          readout tracks the preview&rsquo;s current size as you go. The layout
          lands in one of three arrangements:
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>mobile</strong>: single column, hamburger menu, stacked
            footer
          </li>
          <li>
            <strong>tablet</strong> (512px+): two-column grid, nav links
            visible, inline footer
          </li>
          <li>
            <strong>desktop</strong> (896px+): three-column grid, full width
          </li>
        </ul>
        <p>
          Here is the part worth noticing: a real{" "}
          <code className="text-zinc-800 dark:text-zinc-200">@media</code>{" "}
          breakpoint only ever sees the browser&rsquo;s actual viewport (the
          visible area of the window), never an arbitrary box like the preview
          above. Since the whole point of this demo is a box you resize
          independently of your real window, it uses{" "}
          <span className="italic text-zinc-700 dark:text-zinc-300">container queries</span>{" "}
          instead: the preview is marked as a container, and its layout responds
          to its own width. No JavaScript decides the columns; the CSS does. The
          breakpoints (512px and 896px) are Tailwind&rsquo;s named container
          sizes. Written out as plain CSS, the card grid looks like this:
        </p>
        <CodeBlock
          lang="css"
          title="How the demo's card grid responds to its container"
          code={`.preview {
  container-type: inline-size;
}

@container (min-width: 512px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

@container (min-width: 896px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}`}
        />
        <p>
          On a real page you react to the whole window instead of a box, so you
          swap{" "}
          <code className="text-zinc-800 dark:text-zinc-200">@container</code> for{" "}
          <code className="text-zinc-800 dark:text-zinc-200">
            @media (min-width: 896px)
          </code>
          , keyed to the viewport rather than the preview. That{" "}
          <code className="text-zinc-800 dark:text-zinc-200">@media</code> form is
          the one you&rsquo;ll type most.
        </p>
      </div>

      <p className="text-zinc-700 dark:text-zinc-300">
        <strong>If you remember one thing:</strong> build one layout that adapts
        to the space it&rsquo;s given, and it works on every screen, without
        detecting the device or keeping a separate mobile site.
      </p>
    </div>
  );
}
