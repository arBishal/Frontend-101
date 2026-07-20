import { getConcept, conceptMetadata } from "@/app/lib/concepts";
import { UserX, Scale, Code } from "lucide-react";
import AccessibilityDemo from "./AccessibilityDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ConceptHeader from "@/app/components/ConceptHeader";
import ProblemCards from "@/app/components/ProblemCards";

const problems = [
  {
    icon: UserX,
    title: "Excluded Users",
    description:
      "Roughly 15% of the world\u2019s population lives with some form of disability. Inaccessible UI locks them out.",
  },
  {
    icon: Scale,
    title: "Legal Risk",
    description:
      "Laws like the ADA and European Accessibility Act mandate accessible digital experiences. Non-compliance carries real consequences.",
  },
  {
    icon: Code,
    title: "Worse Code",
    description:
      "Non-semantic HTML is harder to style, test, and maintain. Accessible code is usually better code.",
  },
];

export const metadata = conceptMetadata("accessibility");
const concept = getConcept("accessibility");

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader title={concept.title} subtitle={concept.description} />

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>What is accessibility?</SectionLabel>
        <p>
          Accessibility, often shortened to{" "}
          <span className="italic text-zinc-700 dark:text-zinc-300">a11y</span>{" "}
          (a, then 11 letters, then y), meaning everyone can use your UI,
          including people with disabilities. That includes users who navigate with a keyboard instead
          of a mouse, people who rely on screen readers to hear what&rsquo;s on
          screen, and users with low vision who need sufficient color contrast.
        </p>
        <p>
          It&rsquo;s not a niche concern. Accessibility covers a wide spectrum:
          permanent disabilities (blindness, motor impairments), temporary ones
          (a broken arm), and situational ones (using your phone in bright
          sunlight). Designing for accessibility means designing for all of
          these.
        </p>
        <p>
          The web has built-in accessibility features: semantic HTML elements
          like{" "}
          <code className="text-zinc-800 dark:text-zinc-200">&lt;button&gt;</code>,{" "}
          <code className="text-zinc-800 dark:text-zinc-200">&lt;label&gt;</code>, and{" "}
          <code className="text-zinc-800 dark:text-zinc-200">&lt;nav&gt;</code> carry meaning that assistive technology
          can read. The most common failures aren&rsquo;t hard problems; they&rsquo;re
          simple oversights: missing alt text, low contrast,
          clickable <code className="text-zinc-800 dark:text-zinc-200">&lt;div&gt;</code>s instead of{" "}
          <code className="text-zinc-800 dark:text-zinc-200">&lt;button&gt;</code>s, inputs without labels.
        </p>
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          Roughly 15% of the world&rsquo;s population lives with some form of
          disability. Building an inaccessible UI means excluding real people
          from using your product.
        </p>
        <p>
          Beyond ethics, it&rsquo;s often a legal requirement. Laws like the
          ADA in the US and the European Accessibility Act mandate accessible
          digital experiences, and WCAG (Web Content Accessibility Guidelines)
          is the standard they reference.
        </p>
        <p>
          The good news: accessible code is usually <em>better</em> code.
          Semantic HTML is easier to style, test, and maintain. A logical focus
          order makes keyboard shortcuts possible. Clear labels make forms less
          confusing for <em>everyone</em>. Fixing accessibility doesn&rsquo;t
          add complexity; it removes it.
        </p>
        <ProblemCards problems={problems} />
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <AccessibilityDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>How it works</SectionLabel>
        <p>
          Accessibility (a11y) means everyone can use your UI, including people
          who rely on screen readers, keyboard navigation, or have low vision.
        </p>
        <p>
          The four issues in the demo represent the most common real-world
          problems:
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>alt text</strong>: describes images for screen readers so
            non-sighted users know what&apos;s on screen
          </li>
          <li>
            <strong>contrast</strong>: ensures text is readable for everyone,
            including users with low vision or in bright environments
          </li>
          <li>
            <strong>form labels</strong>: connects inputs to their descriptions
            so screen readers can announce them, and clicking a label focuses its
            input
          </li>
          <li>
            <strong>keyboard access</strong>: using{" "}
            <code className="text-zinc-800 dark:text-zinc-200">&lt;button&gt;</code>{" "}
            instead of{" "}
            <code className="text-zinc-800 dark:text-zinc-200">&lt;div&gt;</code>{" "}
            enables keyboard navigation and communicates purpose to assistive
            technology
          </li>
        </ul>
        <p>
          Try Tabbing through the form with &quot;keyboard&quot; toggled off,
          then on: notice how the Sign Up button becomes reachable. These fixes
          are small but make a big difference.
        </p>
      </div>
    </div>
  );
}
