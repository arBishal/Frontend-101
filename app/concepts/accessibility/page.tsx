import type { Metadata } from "next";
import AccessibilityDemo from "./AccessibilityDemo";

export const metadata: Metadata = {
  title: "Accessibility | Frontend 101",
  description: "Making sure the UI works for everyone.",
};

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Accessibility
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Making sure the UI works for everyone.
        </p>
      </div>

      <div>
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-500 dark:text-zinc-300 mb-4">
          Interactive demo
        </p>
        <AccessibilityDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-500 dark:text-zinc-300">
          How it works
        </p>
        <p>
          Accessibility (a11y) means everyone can use your UI — including people
          who rely on screen readers, keyboard navigation, or have low vision.
        </p>
        <p>
          The four issues in the demo represent the most common real-world
          problems:
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>alt text</strong> — describes images for screen readers so
            non-sighted users know what&apos;s on screen
          </li>
          <li>
            <strong>contrast</strong> — ensures text is readable for everyone,
            including users with low vision or in bright environments
          </li>
          <li>
            <strong>form labels</strong> — connects inputs to their descriptions
            so screen readers can announce them, and clicking a label focuses its
            input
          </li>
          <li>
            <strong>keyboard access</strong> — using{" "}
            <code className="text-zinc-800 dark:text-zinc-200">&lt;button&gt;</code>{" "}
            instead of{" "}
            <code className="text-zinc-800 dark:text-zinc-200">&lt;div&gt;</code>{" "}
            enables keyboard navigation and communicates purpose to assistive
            technology
          </li>
        </ul>
        <p>
          Try Tabbing through the form with &quot;keyboard&quot; toggled off,
          then on — notice how the Sign Up button becomes reachable. These fixes
          are small but make a big difference.
        </p>
      </div>
    </div>
  );
}
