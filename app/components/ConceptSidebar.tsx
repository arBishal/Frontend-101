"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { concepts } from "@/app/lib/concepts";
import { useState, useEffect } from "react";

export default function ConceptSidebar() {
  const pathname = usePathname();
  const [expandedSlugs, setExpandedSlugs] = useState<Set<string>>(() => {
    // Auto-expand any concept whose sub-route is active on first render
    const initial = new Set<string>();
    concepts.forEach((c) => {
      if (c.children && pathname.startsWith(`/concepts/${c.slug}`)) {
        initial.add(c.slug);
      }
    });
    return initial;
  });

  // Auto-expand when navigating to any route under a concept with children
  useEffect(() => {
    concepts.forEach((c) => {
      if (c.children && pathname.startsWith(`/concepts/${c.slug}`)) {
        setExpandedSlugs((prev) => new Set(prev).add(c.slug));
      }
    });
  }, [pathname]);


  function toggleExpanded(slug: string) {
    setExpandedSlugs((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  }

  return (
    <aside className="shrink-0 w-14 lg:w-64 border-r border-zinc-200 dark:border-zinc-800">
      <nav className="flex flex-col gap-1 px-2 py-6 lg:px-6 lg:py-6">
        {concepts.map((concept) => {
          const href = `/concepts/${concept.slug}`;
          const hasChildren = concept.children && concept.children.length > 0;
          const isExpanded = expandedSlugs.has(concept.slug);
          const isParentHighlighted = hasChildren
            ? pathname.startsWith(href)
            : pathname === href;
          const Icon = concept.icon;

          return (
            <div key={concept.slug}>
              <div
                className={`flex items-center gap-3 rounded px-2.5 py-2 transition-colors ${
                  !hasChildren && pathname === href
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    : isParentHighlighted
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                {hasChildren && !isExpanded ? (
                  <button
                    onClick={() => toggleExpanded(concept.slug)}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className={`hidden lg:block text-sm truncate ${isParentHighlighted ? "font-medium" : ""}`}>
                      {concept.title}
                    </span>
                  </button>
                ) : (
                  <Link href={href} title={concept.title} className="flex items-center gap-3 flex-1 min-w-0">
                    <Icon className="size-4 shrink-0" />
                    <span className={`hidden lg:block text-sm truncate ${isParentHighlighted ? "font-medium" : ""}`}>
                      {concept.title}
                    </span>
                  </Link>
                )}
                {hasChildren && (
                  <button
                    onClick={() => toggleExpanded(concept.slug)}
                    aria-label="Toggle submenu"
                    className="hidden lg:flex shrink-0 p-0.5 -mr-0.5"
                  >
                    <ChevronDown
                      className={`size-3.5 transition-transform ${isExpanded ? "rotate-0" : "-rotate-90"}`}
                    />
                  </button>
                )}
              </div>
              {isExpanded && concept.children && (
                <div className="hidden lg:flex flex-col gap-0.5 ml-7 mt-0.5">
                  {concept.children.map((child) => {
                    const childHref = `/concepts/${child.slug}`;
                    const isChildActive = pathname === childHref;

                    return (
                      <Link
                        key={child.slug}
                        href={childHref}
                        className={`rounded px-2.5 py-1.5 text-sm transition-colors ${
                          isChildActive
                            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium"
                            : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                        }`}
                      >
                        {child.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
