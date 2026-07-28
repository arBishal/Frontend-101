"use client";

import Link from "next/link";
import { Link2, Check } from "lucide-react";
import ThemeToggleButton from "@/app/components/ThemeToggleButton";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { concepts, type Concept } from "@/app/lib/concepts";

const availableConcepts = concepts;

function getProgressPct(pathname: string, available: Concept[]): number {
  const rawSlug = pathname.split("/concepts/")[1];
  const topLevelSlug = rawSlug ? rawSlug.split("/")[0] : null;
  const index = available.findIndex((c) => c.slug === topLevelSlug);
  return index >= 0 ? ((index + 1) / available.length) * 100 : 0;
}

function useCopyLink() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // Clipboard unavailable (insecure context or denied permission) — don't
      // flip to the "copied" confirmation for a write that didn't happen.
      return;
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }

  return { copied, handleShare };
}

export default function Navbar() {
  const pathname = usePathname();
  const isConceptPage = pathname.startsWith("/concepts/");
  const { copied, handleShare } = useCopyLink();
  const progressPct = isConceptPage
    ? getProgressPct(pathname, availableConcepts)
    : 0;

  return (
    <nav className="border-default relative border-b px-4 py-3 lg:px-6 lg:py-5">
      <div className="mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-base font-semibold tracking-tight lg:text-lg"
        >
          frontend-101
        </Link>
        <div className="text-muted flex items-center gap-3 text-sm">
          <a
            href="https://github.com/arBishal/Frontend-101"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-strong transition-colors"
          >
            GitHub
          </a>
          {isConceptPage && (
            <button
              onClick={handleShare}
              className="hover:bg-inset rounded p-1.5 transition-colors"
              aria-label="Copy link"
            >
              {copied ? (
                <Check className="size-4 text-emerald-500" />
              ) : (
                <Link2 className="size-4" />
              )}
            </button>
          )}
          <ThemeToggleButton className="hover:bg-inset rounded p-1.5" />
        </div>
      </div>
      {isConceptPage && (
        <div className="bg-inset absolute right-0 bottom-0 left-0 h-0.5">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}
    </nav>
  );
}
