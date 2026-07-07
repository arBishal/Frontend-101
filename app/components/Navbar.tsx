"use client";

import Link from "next/link";
import { Sun, Moon, Link2, Check } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { concepts } from "@/app/lib/concepts";

const availableConcepts = concepts.filter((c) => c.status === "available");

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      {children}
      <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded text-xs bg-zinc-900 dark:bg-zinc-700 text-zinc-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        {label}
      </span>
    </div>
  );
}

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const isConceptPage = pathname.startsWith("/concepts/");
  const [copied, setCopied] = useState(false);

  const currentSlug = isConceptPage ? pathname.split("/concepts/")[1] : null;
  const currentIndex = availableConcepts.findIndex((c) => c.slug === currentSlug);
  const progressPct = currentIndex >= 0 ? ((currentIndex + 1) / availableConcepts.length) * 100 : 0;

  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <nav className="relative border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 lg:px-6 lg:py-4">
      <div className="mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-base lg:text-lg font-semibold tracking-tight"
        >
          frontend-101
        </Link>
        <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <a
            href="https://github.com/arBishal/Frontend-101"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            GitHub
          </a>
          {isConceptPage && (
            <Tooltip label={copied ? "Copied!" : "Copy link"}>
              <button
                onClick={handleShare}
                className="rounded p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Copy link"
              >
                {copied ? (
                  <Check className="size-4 text-emerald-500" />
                ) : (
                  <Link2 className="size-4" />
                )}
              </button>
            </Tooltip>
          )}
          <Tooltip label={resolvedTheme === "dark" ? "Light mode" : "Dark mode"}>
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="rounded p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="size-4 hidden dark:block" />
              <Moon className="size-4 block dark:hidden" />
            </button>
          </Tooltip>
        </div>
      </div>
      {isConceptPage && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}
    </nav>
  );
}
