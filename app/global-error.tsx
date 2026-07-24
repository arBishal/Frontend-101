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
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white text-zinc-900">
        <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
          Something went wrong
        </p>
        <h2 className="text-lg font-semibold">
          {error.message || "An unexpected error occurred"}
        </h2>
        <button
          onClick={unstable_retry}
          className="mt-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-zinc-600"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
