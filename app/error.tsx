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
      <p className="text-subtle font-mono text-xs tracking-widest uppercase">
        Something went wrong
      </p>
      <h2 className="text-strong text-lg font-semibold">
        {error.message || "An unexpected error occurred"}
      </h2>
      <button
        onClick={reset}
        className="text-strong hover:text-muted mt-2 text-sm font-medium underline underline-offset-4 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
