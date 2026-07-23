"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { concepts } from "@/app/lib/concepts";

export default function ConceptNav() {
  const pathname = usePathname();
  const currentIndex = concepts.findIndex((c) => {
    const href = `/concepts/${c.slug}`;
    return pathname === href || pathname.startsWith(href + "/");
  });
  const prev = currentIndex > 0 ? concepts[currentIndex - 1] : null;
  const next = currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : null;

  return (
    <div className="flex items-center justify-between pt-6">
      {prev ? (
        <Link
          href={`/concepts/${prev.slug}`}
          className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
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
          className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
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
