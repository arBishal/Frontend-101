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
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">
        Something went wrong
      </p>
      <h2 className="text-lg font-semibold text-strong">
        {error.message || "An unexpected error occurred"}
      </h2>
      <button
        onClick={reset}
        className="mt-2 text-sm font-medium text-strong underline underline-offset-4 hover:text-muted transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
