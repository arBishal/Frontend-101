import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-mono text-lg font-semibold tracking-tight">
          frontend-101
        </Link>
        <div className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <a href="#concepts" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Concepts
          </a>
          <a
            href="https://github.com/arBishal/Frontend-101"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
