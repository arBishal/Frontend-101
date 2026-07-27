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

function SidebarItem({
  concept,
  pathname,
  isExpanded,
  onToggle,
  mobileExpanded,
}: SidebarItemProps) {
  const href = `/concepts/${concept.slug}`;
  const hasChildren = concept.children && concept.children.length > 0;
  const isParentHighlighted = hasChildren
    ? pathname.startsWith(href)
    : pathname === href;
  const isActive = !hasChildren && pathname === href;
  const Icon = concept.icon;

  return (
    <div>
      <div
        className={cn(
          "m-0 flex items-center gap-3 rounded transition-colors",
          // Collapsed rail: square highlight hugging the icon, left-aligned.
          // Expanded overlay and desktop: full-width row.
          mobileExpanded ? "px-3 py-2.5" : "w-fit px-3 py-2.5 lg:w-auto",
          isActive
            ? "bg-inset text-strong"
            : isParentHighlighted
              ? // On the collapsed rail the submenu is hidden, so the parent icon
                // itself must carry the active fill; the visible child shows it
                // instead once expanded (overlay) or on desktop.
                cn(
                  "text-strong",
                  !mobileExpanded && "bg-inset lg:bg-transparent",
                )
              : "text-muted hover:text-strong",
        )}
      >
        <Link
          href={href}
          title={concept.title}
          className="flex min-h-5 min-w-0 flex-1 items-center gap-3"
        >
          <Icon className="size-4 shrink-0" />
          <span
            className={cn(
              "truncate text-sm lg:text-base",
              mobileExpanded ? "block" : "hidden lg:block",
              isParentHighlighted && "font-medium",
            )}
          >
            {concept.title}
          </span>
        </Link>
        {hasChildren && (
          <button
            onClick={() => onToggle(concept.slug)}
            aria-label="Toggle submenu"
            className={cn(
              "-mr-0.5 shrink-0 p-0.5",
              mobileExpanded ? "flex" : "hidden lg:flex",
            )}
          >
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform",
                isExpanded ? "rotate-0" : "-rotate-90",
              )}
            />
          </button>
        )}
      </div>
      {isExpanded && concept.children && (
        <div
          className={cn(
            "mt-0.5 ml-7 flex-col gap-0.5",
            mobileExpanded ? "flex" : "hidden lg:flex",
          )}
        >
          {concept.children.map((child: ConceptChild) => {
            const childHref = `/concepts/${child.slug}`;
            const isChildActive = pathname === childHref;
            return (
              <Link
                key={child.slug}
                href={childHref}
                className={cn(
                  "rounded px-2.5 py-1.5 text-sm transition-colors lg:text-base",
                  isChildActive
                    ? "bg-inset text-strong font-medium"
                    : "text-subtle hover:text-strong",
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
    <aside className="border-default sticky top-0 z-10 h-screen w-14 shrink-0 overflow-visible border-r lg:w-64">
      {/* Mobile overlay panel */}
      {mobileExpanded && (
        <div className="bg-surface border-default absolute top-0 left-0 z-20 h-full w-48 border-r lg:hidden">
          <nav className="flex flex-col px-2 py-6">
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
      <nav className="flex flex-col px-2 py-6 lg:px-6 lg:py-6">
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
        className={cn(
          "border-default absolute top-1/2 z-50 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-zinc-400 shadow-sm transition-all duration-200 hover:text-zinc-600 lg:hidden dark:bg-zinc-900 dark:hover:text-zinc-300",
          mobileExpanded ? "left-48" : "left-14",
        )}
      >
        <ChevronRight
          className={cn(
            "size-3 transition-transform",
            mobileExpanded && "rotate-180",
          )}
        />
      </button>
    </aside>
  );
}
