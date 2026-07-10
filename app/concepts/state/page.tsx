import type { Metadata } from "next";
import StateDemo from "./StateDemo";

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

      <div>
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-500 dark:text-zinc-300 mb-4">
          Interactive demo
        </p>
        <StateDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-500 dark:text-zinc-300">
          How it works
        </p>
        <p>
          State is data that can change over time. Every time state changes, the
          UI re-renders to reflect the new value — this is the core loop of
          every interactive interface.
        </p>
        <p>
          The profile card above is driven by three pieces of state. The
          inspector panel on the right shows the raw values that the card is
          reading, updating in real time as you interact.
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>name</strong> — a string, edited via the text input
          </li>
          <li>
            <strong>following</strong> — a boolean toggled by the Follow button
          </li>
          <li>
            <strong>likes</strong> — a number incremented by the heart button
          </li>
        </ul>
        <p>
          Each click or keystroke calls a state update, which triggers a
          re-render, which updates the UI. The inspector makes this invisible
          process visible — like a mini version of React DevTools.
        </p>
      </div>
    </div>
  );
}
