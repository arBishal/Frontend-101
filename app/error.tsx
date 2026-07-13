"use client";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        Something went wrong
      </p>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {error.message || "An unexpected error occurred"}
      </h2>
      <button
        onClick={reset}
        className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-4 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
