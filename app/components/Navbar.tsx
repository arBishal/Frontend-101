"use client";

import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
      <div className="mx-auto flex items-center justify-between">
        <Link href="/" className="font-mono text-lg font-semibold tracking-tight">
          frontend-101
        </Link>
        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <a
            href="https://github.com/arBishal/Frontend-101"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            GitHub
          </a>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="size-4 hidden dark:block" />
            <Moon className="size-4 block dark:hidden" />
          </button>
        </div>
      </div>
    </nav>
  );
}
