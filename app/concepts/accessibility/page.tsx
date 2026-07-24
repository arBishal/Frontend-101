import { getConcept, conceptMetadata } from "@/app/lib/concepts";
import Takeaway from "@/app/components/ui/Takeaway";
import { UserX, Palette, Scale } from "lucide-react";
import AccessibilityDemo from "./AccessibilityDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ConceptHeader from "@/app/components/ConceptHeader";
import ProblemCards from "@/app/components/ProblemCards";

const problems = [
  {
    icon: UserX,
    title: "Announced as a filename",
    description:
      "A screen reader hits your hero image and, with no alt text, reads out “IMG_2048.png.” The user has no idea what they just missed.",
  },
  {
    icon: Palette,
    title: "Red, and nothing else",
    description:
      "A form marks the failed field in red and adds no icon, no text. To a colorblind user, or anyone on a sun-washed screen, the field looks perfectly fine.",
  },
  {
    icon: Scale,
    title: "Later, then a lawsuit",
    description:
      "Ship an inaccessible public service and the first formal complaint turns “later” into “now.”",
  },
];

export const metadata = conceptMetadata("accessibility");
const concept = getConcept("accessibility");

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader title={concept.title} subtitle={concept.description} />

      <div className="text-muted space-y-3 text-sm lg:text-base">
        <SectionLabel>What is accessibility?</SectionLabel>
        <p>
          Accessibility (often shortened to{" "}
          <span className="text-body italic">a11y</span>, for the a, then 11
          letters, then y) means everyone can use your UI, including people with
          disabilities. That covers someone navigating by keyboard instead of a
          mouse, someone using a screen reader to hear what is on screen, and
          someone with low vision who needs strong color contrast.
        </p>
        <p>
          Accessibility covers a far wider spectrum than most people picture:
          permanent disabilities (blindness, motor impairments), temporary ones
          (a broken arm), and situational ones (bright sunlight on your phone).
          Designing for it means designing for all of these, which turns out to
          be nearly everyone at some point.
        </p>
        <p>
          The good news is that the web has accessibility built in. Semantic
          HTML elements like <code className="text-code">&lt;button&gt;</code>,{" "}
          <code className="text-code">&lt;label&gt;</code>, and{" "}
          <code className="text-code">&lt;nav&gt;</code> carry meaning that
          assistive tools can read out. The most common failures aren’t hard
          problems, they’re simple oversights: missing alt text, low contrast, a
          clickable <code className="text-code">&lt;div&gt;</code> where a{" "}
          <code className="text-code">&lt;button&gt;</code> belongs, an input
          with no label.
        </p>
      </div>

      <div className="text-muted space-y-3 text-sm lg:text-base">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          The WHO puts it around 15% of the world’s population, more than a
          billion people, living with some form of disability. Build an
          inaccessible UI and you are not just annoying those users, you are
          locking them out of the thing entirely.
        </p>
        <p>
          It is also, increasingly, the law: the ADA in the US and the European
          Accessibility Act require accessible digital experiences, with WCAG
          (the Web Content Accessibility Guidelines) as the standard they point
          to. And fixing these problems usually makes the code simpler, not more
          complex. A real <code className="text-code">&lt;button&gt;</code>{" "}
          needs less styling and JavaScript than a{" "}
          <code className="text-code">&lt;div&gt;</code> rigged to act like one.
        </p>
        <ProblemCards problems={problems} />
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <p className="text-muted mb-4">
          Before you toggle anything: with every fix off, Tab through the form.
          Can you reach the Log In button? Make a guess, then try it, then start
          flipping the switches in the audit panel.
        </p>
        <AccessibilityDemo />
        <p className="text-body mt-6 mb-2">Try breaking it:</p>
        <ul className="text-muted list-inside list-disc space-y-1.5">
          <li>
            Turn alt text on and a green <code className="text-code">alt</code>{" "}
            badge appears on the logo; turn it off and it is gone. With it off,
            what is left for a screen reader to announce when it reaches that
            image?
          </li>
          <li>
            With form labels off, click the text sitting above a field. Nothing
            focuses. Turn labels on and the same click lands in the input,
            because the label is now tied to it.
          </li>
          <li>
            Turn contrast off and read the heading. That is the same text at a
            ratio that fails for low-vision users, even if you can still just
            about make it out.
          </li>
        </ul>
      </div>

      <div className="text-muted space-y-3 text-sm lg:text-base">
        <SectionLabel>How it works</SectionLabel>
        <p>
          Flip each switch in the Accessibility Audit and the form changes to
          match; the score counts how many of the four you have fixed. Each one
          maps to a real-world failure:
        </p>
        <ul className="list-inside list-disc space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>alt text</strong>: describes images for screen readers, so
            non-sighted users know what is on screen
          </li>
          <li>
            <strong>contrast</strong>: keeps text readable for low vision and in
            bright environments
          </li>
          <li>
            <strong>form labels</strong>: tie each input to its description, so
            screen readers can announce it and clicking the label focuses the
            field
          </li>
          <li>
            <strong>keyboard access</strong>: a real{" "}
            <code className="text-code">&lt;button&gt;</code> can be reached and
            pressed without a mouse; a{" "}
            <code className="text-code">&lt;div&gt;</code> cannot
          </li>
        </ul>
        <p>
          The keyboard fix is the one to feel rather than read. Tab through with
          it off and focus skips the Log In control entirely, because it is a{" "}
          <code className="text-code">&lt;div&gt;</code>. Turn it on and the
          same control becomes a real{" "}
          <code className="text-code">&lt;button&gt;</code>, in the tab order
          and announced as a button. None of these fixes are new tools; they are
          the semantic HTML the{" "}
          <a
            href="/concepts/the-dom"
            className="hover:text-strong underline underline-offset-2 transition-colors"
          >
            DOM
          </a>{" "}
          is already built from.
        </p>
      </div>

      <Takeaway>
        Most accessibility is small, boring correctness (the right element, a
        real label, enough contrast), and it decides whether some people can use
        your UI at all.
      </Takeaway>
    </div>
  );
}
