import { getConcept, conceptMetadata } from "@/app/lib/concepts";
import Takeaway from "@/app/components/ui/Takeaway";
import Link from "next/link";
import { MousePointerClick, AlertCircle, Workflow } from "lucide-react";
import StateDemo from "./StateDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ConceptHeader from "@/app/components/ConceptHeader";
import ProblemCards from "@/app/components/ProblemCards";

const problems = [
  {
    icon: MousePointerClick,
    title: "One source of truth",
    description:
      "Without state, every place data appears on screen has to be updated by hand, and any place you forget drifts out of sync with the rest.",
  },
  {
    icon: AlertCircle,
    title: "Stays in sync",
    description:
      "State guarantees the screen reflects the current data, closing off the most common UI bug: a display showing something the data no longer says.",
  },
  {
    icon: Workflow,
    title: "Manageable complexity",
    description:
      "The more interactive pieces a UI has, the more they can affect each other. State is what keeps that from turning into a knot of manual updates.",
  },
];

export const metadata = conceptMetadata("state");
const concept = getConcept("state");

export default function StatePage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader title={concept.title} subtitle={concept.description} />

      <div className="text-muted space-y-3 text-sm lg:text-base">
        <SectionLabel>What is state?</SectionLabel>
        <p>
          State is data that changes over time. A plain HTML page is static: its
          content is baked in and never moves. State is what makes a UI{" "}
          <em className="text-body">interactive</em>, the value behind a counter
          that climbs, a menu that knows whether it is open, a text field that
          updates as you type.
        </p>
        <p>
          In frameworks like React, state is a special kind of variable. When
          you change it, the framework re-renders the parts of the UI that read
          it, rebuilding just those pieces of the screen. You don’t touch the
          DOM yourself; you change the data, and the screen follows.
        </p>
        <p>
          Once you start looking, state is everywhere: whether a user is logged
          in, the items in a shopping cart, the current value of a search input,
          which tab is selected, whether a modal is showing.
        </p>
      </div>

      <div className="text-muted space-y-3 text-sm lg:text-base">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          Without state, keeping the screen current means finding the right DOM
          element and rewriting it by hand every time something changes. For a
          lone counter that is manageable. Add a dozen pieces that can each
          change the others, and the by-hand approach turns into a knot nobody
          wants to touch.
        </p>
        <p>
          State is the single source of truth for your UI: one place the data
          lives, with the screen derived from it. When the two stay in sync
          automatically, you close off the most common UI bug there is, the
          screen showing something different from what the data actually says.
        </p>
        <ProblemCards problems={problems} />
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <p className="text-muted mb-4">
          Before you touch it: clear the name field completely. What do you
          think the inspector shows for <code className="text-code">name</code>,
          and what does the card render in its place? Edit the name, toggle
          Follow, and tap the heart, then check the panel on the right.
        </p>
        <StateDemo />
        <p className="text-body mt-6 mb-2">Try breaking it:</p>
        <ul className="text-muted list-inside list-disc space-y-1.5">
          <li>
            Type a number like <code className="text-code">42</code> into the
            name field, then read the inspector. Does{" "}
            <code className="text-code">name</code> hold the number{" "}
            <code className="text-code">42</code> or the text{" "}
            <code className="text-code">&quot;42&quot;</code>, and what in the
            inspector tells you which?
          </li>
          <li>
            Tap the heart ten times fast. Each tap is a separate state update,
            so <code className="text-code">likes</code> climbs one at a time and
            never skips a number.
          </li>
          <li>
            Toggle Follow on and off. Only{" "}
            <code className="text-code">following</code> flips between{" "}
            <code className="text-code">true</code> and{" "}
            <code className="text-code">false</code>; the name and like count
            sit untouched.
          </li>
        </ul>
      </div>

      <div className="text-muted space-y-3 text-sm lg:text-base">
        <SectionLabel>How it works</SectionLabel>
        <p>
          The profile card is driven by three pieces of state. Edit the name,
          toggle Follow, or tap the heart, and the State Inspector on the right
          updates in step, showing the raw values the card reads from.
        </p>
        <ul className="list-inside list-disc space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>name</strong>: a string, edited via the text input
          </li>
          <li>
            <strong>following</strong>: a boolean toggled by the Follow button
          </li>
          <li>
            <strong>likes</strong>: a number incremented by the heart button
          </li>
        </ul>
        <p>
          Each keystroke or tap calls a state update, which triggers a
          re-render, which redraws what you see. You never reach into the page
          and edit it by hand, that is the shift the{" "}
          <Link
            href="/concepts/the-dom"
            className="hover:text-strong underline underline-offset-2 transition-colors"
          >
            DOM
          </Link>{" "}
          page sets up. The inspector makes that invisible loop visible, a mini
          version of React DevTools.
        </p>
      </div>

      <Takeaway>
        Change the state and the UI redraws itself, no hand-editing the page
        required.
      </Takeaway>
    </div>
  );
}
