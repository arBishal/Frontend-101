"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { concepts } from "@/app/lib/concepts";

export default function ConceptSidebar() {
  const pathname = usePathname();

  return (
    <aside className="shrink-0 w-14 lg:w-64 border-r border-zinc-200 dark:border-zinc-800">
      <nav className="flex flex-col gap-1 px-2 py-6 lg:px-6 lg:py-6">
        {concepts.map((concept) => {
          const href = `/concepts/${concept.slug}`;
          const isActive = pathname === href;
          const Icon = concept.icon;

          return (
            <Link
              key={concept.slug}
              href={href}
              title={concept.title}
              className={`flex items-center gap-3 rounded px-2.5 py-2 transition-colors ${
                isActive
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              <span className={`hidden lg:block text-sm truncate ${isActive ? "font-medium" : ""}`}>
                {concept.title}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
