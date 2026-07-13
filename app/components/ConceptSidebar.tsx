"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { concepts, type Concept, type ConceptChild } from "@/app/lib/concepts";
import { useState, useEffect } from "react";
import { cn } from "@/app/lib/cn";

type SidebarItemProps = {
  concept: Concept;
  pathname: string;
  isExpanded: boolean;
  onToggle: (slug: string) => void;
};

function SidebarItem({ concept, pathname, isExpanded, onToggle }: SidebarItemProps) {
  const href = `/concepts/${concept.slug}`;
  const hasChildren = concept.children && concept.children.length > 0;
  const isParentHighlighted = hasChildren ? pathname.startsWith(href) : pathname === href;
  const isActive = !hasChildren && pathname === href;
  const Icon = concept.icon;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-3 rounded px-2.5 py-2 transition-colors",
          isActive
            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            : isParentHighlighted
              ? "text-zinc-900 dark:text-zinc-100"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
        )}
      >
        <Link href={href} title={concept.title} className="flex items-center gap-3 flex-1 min-w-0">
          <Icon className="size-4 shrink-0" />
          <span className={cn("hidden lg:block text-sm truncate", isParentHighlighted && "font-medium")}>
            {concept.title}
          </span>
        </Link>
        {hasChildren && (
          <button
            onClick={() => onToggle(concept.slug)}
            aria-label="Toggle submenu"
            className="hidden lg:flex shrink-0 p-0.5 -mr-0.5"
          >
            <ChevronDown
              className={cn("size-3.5 transition-transform", isExpanded ? "rotate-0" : "-rotate-90")}
            />
          </button>
        )}
      </div>
      {isExpanded && concept.children && (
        <div className="hidden lg:flex flex-col gap-0.5 ml-7 mt-0.5">
          {concept.children.map((child: ConceptChild) => {
            const childHref = `/concepts/${child.slug}`;
            const isChildActive = pathname === childHref;
            return (
              <Link
                key={child.slug}
                href={childHref}
                className={cn(
                  "rounded px-2.5 py-1.5 text-sm transition-colors",
                  isChildActive
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                {child.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ConceptSidebar() {
  const pathname = usePathname();
  const [expandedSlugs, setExpandedSlugs] = useState<string[]>(() => {
    return concepts
      .filter((c) => c.children && pathname.startsWith(`/concepts/${c.slug}`))
      .map((c) => c.slug);
  });

  useEffect(() => {
    const toExpand = concepts
      .filter((c) => c.children && pathname.startsWith(`/concepts/${c.slug}`))
      .map((c) => c.slug);

    if (toExpand.length > 0) {
      setExpandedSlugs((prev) => {
        const newSlugs = toExpand.filter((s) => !prev.includes(s));
        return newSlugs.length > 0 ? [...prev, ...newSlugs] : prev;
      });
    }
  }, [pathname]);

  function toggleExpanded(slug: string) {
    setExpandedSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      } else {
        return [...prev, slug];
      }
    });
  }

  return (
    <aside className="shrink-0 w-14 lg:w-64 border-r border-zinc-200 dark:border-zinc-800">
      <nav className="flex flex-col gap-1 px-2 py-6 lg:px-6 lg:py-6">
        {concepts.map((concept) => (
          <SidebarItem
            key={concept.slug}
            concept={concept}
            pathname={pathname}
            isExpanded={expandedSlugs.includes(concept.slug)}
            onToggle={toggleExpanded}
          />
        ))}
      </nav>
    </aside>
  );
}
