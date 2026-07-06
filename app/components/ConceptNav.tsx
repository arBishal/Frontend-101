"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { concepts } from "@/app/lib/concepts";

export default function ConceptNav() {
  const pathname = usePathname();
  const currentIndex = concepts.findIndex((c) => `/concepts/${c.slug}` === pathname);
  const prev = currentIndex > 0 ? concepts[currentIndex - 1] : null;
  const next = currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : null;

  return (
    <div className=" flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6">
      {prev ? (
        <Link
          href={`/concepts/${prev.slug}`}
          className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/concepts/${next.slug}`}
          className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <span>{next.title}</span>
          <ArrowRight className="size-4" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
