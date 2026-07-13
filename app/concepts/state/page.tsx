import type { Metadata } from "next";
import { MousePointerClick, AlertCircle, Workflow } from "lucide-react";
import StateDemo from "./StateDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import Card from "@/app/components/ui/Card";

const problems = [
  {
    icon: MousePointerClick,
    title: "Manual DOM Updates",
    description:
      "Without state, you manually find DOM elements and update their content every time something changes.",
  },
  {
    icon: AlertCircle,
    title: "Stale UI",
    description:
      "The screen shows something different from what the data says. This is the #1 source of UI bugs.",
  },
  {
    icon: Workflow,
    title: "Tangled Logic",
    description:
      "Forms with validation, conditional fields, and error messages become an unmanageable mess of imperative code.",
  },
];

export const metadata: Metadata = {
  title: "State | Frontend 101",
  description: "How apps remember things that change.",
};

export default function StatePage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          State
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          How apps remember things that change.
        </p>
      </div>

      <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>What is state?</SectionLabel>
        <p>
          State is data that changes over time. A plain HTML page is static: its
          content is baked in and never moves. State is what makes a UI{" "}
          <em>interactive</em>: a counter that increments, a toggle that opens a
          menu, a text field that updates as you type.
        </p>
        <p>
          In frameworks like React, state is a special kind of variable. When
          you update it, the framework automatically re-renders the parts of the
          UI that depend on it. You don&rsquo;t touch the DOM yourself; you
          change the data, and the screen follows.
        </p>
        <p>
          Common examples of state: whether a user is logged in, the items in a
          shopping cart, the current value of a search input, which tab is
          selected.
        </p>
      </div>

      <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          Without state management, you&rsquo;d have to manually find the right
          DOM element and update its content every time something changes. For a
          simple counter, that&rsquo;s manageable. For a form with validation,
          conditional fields, and error messages, it quickly becomes a tangled
          mess.
        </p>
        <p>
          State is the single source of truth for your UI. When state and
          rendering stay in sync automatically, you eliminate the #1 source of
          UI bugs: the screen showing something different from what the data
          says.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 !mt-4">
          {problems.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="space-y-2 sm:p-5">
              <div className="flex items-center gap-2.5">
                <Icon className="size-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {title}
                </p>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <StateDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>How it works</SectionLabel>
        <p>
          State is data that can change over time. Every time state changes, the
          UI re-renders to reflect the new value; this is the core loop of
          every interactive interface.
        </p>
        <p>
          The profile card above is driven by three pieces of state. The
          inspector panel on the right shows the raw values that the card is
          reading, updating in real time as you interact.
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
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
          Each click or keystroke calls a state update, which triggers a
          re-render, which updates the UI. The inspector makes this invisible
          process visible, like a mini version of React DevTools.
        </p>
      </div>
    </div>
  );
}
