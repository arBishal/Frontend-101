"use client";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white text-zinc-900">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          Something went wrong
        </p>
        <h2 className="text-lg font-semibold">
          {error.message || "An unexpected error occurred"}
        </h2>
        <button
          onClick={unstable_retry}
          className="mt-2 text-sm font-medium underline underline-offset-4 hover:text-zinc-600 transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
