import type { Metadata } from "next";

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
      <div className="rounded border border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center text-sm text-zinc-400 dark:text-zinc-500 font-mono">
        Coming up next
      </div>
    </div>
  );
}
