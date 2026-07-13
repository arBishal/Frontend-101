import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        404
      </p>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        Page not found
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-4 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
