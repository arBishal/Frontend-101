import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">
        404
      </p>
      <h1 className="text-2xl font-bold text-strong">
        Page not found
      </h1>
      <p className="text-sm text-subtle">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-2 text-sm font-medium text-strong underline underline-offset-4 hover:text-muted transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
