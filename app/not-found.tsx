import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-subtle font-mono text-xs tracking-widest uppercase">
        404
      </p>
      <h1 className="text-strong text-2xl font-bold">Page not found</h1>
      <p className="text-subtle text-sm">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="text-strong hover:text-muted mt-2 text-sm font-medium underline underline-offset-4 transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
