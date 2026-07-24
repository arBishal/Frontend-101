"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { concepts, type Concept, type ConceptChild } from "@/app/lib/concepts";
import { useState } from "react";
import { cn } from "@/app/lib/cn";

type SidebarItemProps = {
  concept: Concept;
  pathname: string;
  isExpanded: boolean;
  onToggle: (slug: string) => void;
  mobileExpanded: boolean;
};

function SidebarItem({ concept, pathname, isExpanded, onToggle, mobileExpanded }: SidebarItemProps) {
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
            ? "bg-inset text-strong"
            : isParentHighlighted
              ? "text-strong"
              : "text-muted hover:text-strong hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
        )}
      >
        <Link href={href} title={concept.title} className="flex items-center gap-3 flex-1 min-w-0">
          <Icon className="size-4 shrink-0" />
          <span className={cn("text-sm truncate", mobileExpanded ? "block" : "hidden lg:block", isParentHighlighted && "font-medium")}>
            {concept.title}
          </span>
        </Link>
        {hasChildren && (
          <button
            onClick={() => onToggle(concept.slug)}
            aria-label="Toggle submenu"
            className={cn("shrink-0 p-0.5 -mr-0.5", mobileExpanded ? "flex" : "hidden lg:flex")}
          >
            <ChevronDown
              className={cn("size-3.5 transition-transform", isExpanded ? "rotate-0" : "-rotate-90")}
            />
          </button>
        )}
      </div>
      {isExpanded && concept.children && (
        <div className={cn("flex-col gap-0.5 ml-7 mt-0.5", mobileExpanded ? "flex" : "hidden lg:flex")}>
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
                    ? "bg-inset text-strong font-medium"
                    : "text-subtle hover:text-strong"
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
  const [mobileExpanded, setMobileExpanded] = useState(false);
  // Explicit user toggles, keyed by slug. A slug with no entry follows whether its
  // section is the active route, so open state is derived from the pathname during
  // render — no effect syncing state to the URL, and no cascading setState.
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});

  const isExpanded = (slug: string) =>
    overrides[slug] ?? pathname.startsWith(`/concepts/${slug}`);

  function toggleExpanded(slug: string) {
    setOverrides((prev) => ({
      ...prev,
      [slug]: !(prev[slug] ?? pathname.startsWith(`/concepts/${slug}`)),
    }));
  }

  return (
    <aside className="relative z-10 shrink-0 w-14 lg:w-64 border-r border-default overflow-visible sticky top-0 h-screen">
      {/* Mobile overlay panel */}
      {mobileExpanded && (
        <div className="lg:hidden absolute left-0 top-0 h-full w-48 z-20 bg-surface border-r border-default">
          <nav className="flex flex-col gap-1 px-2 py-6">
            {concepts.map((concept) => (
              <SidebarItem
                key={concept.slug}
                concept={concept}
                pathname={pathname}
                isExpanded={isExpanded(concept.slug)}
                onToggle={toggleExpanded}
                mobileExpanded={true}
              />
            ))}
          </nav>
        </div>
      )}

      {/* Icon-only nav (mobile) / full nav (desktop) */}
      <nav className="flex flex-col gap-1 px-2 py-6 lg:px-6 lg:py-6">
        {concepts.map((concept) => (
          <SidebarItem
            key={concept.slug}
            concept={concept}
            pathname={pathname}
            isExpanded={isExpanded(concept.slug)}
            onToggle={toggleExpanded}
            mobileExpanded={false}
          />
        ))}
      </nav>

      {/* Handle button — fixed to sidebar right edge, vertically centered */}
      <button
        onClick={() => setMobileExpanded((v) => !v)}
        aria-label={mobileExpanded ? "Collapse sidebar" : "Expand sidebar"}
        className={cn("lg:hidden fixed top-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex items-center justify-center size-6 rounded-full bg-white dark:bg-zinc-900 border border-default text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 shadow-sm transition-all duration-200", mobileExpanded ? "left-48" : "left-14")}
      >
        <ChevronRight className={cn("size-3 transition-transform", mobileExpanded && "rotate-180")} />
      </button>
    </aside>
  );
}
