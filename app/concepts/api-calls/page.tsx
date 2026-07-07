import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Calls | Frontend 101",
  description: "How the frontend asks a server for data.",
};

export default function ApiCallsPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          API Calls
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          How the frontend asks a server for data.
        </p>
      </div>
      <div className="rounded border border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center text-sm text-zinc-400 dark:text-zinc-500 font-mono">
        Coming up next
      </div>
    </div>
  );
}
