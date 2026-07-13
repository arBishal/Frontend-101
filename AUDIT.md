# Frontend-101 Codebase Audit

**Date:** 2026-07-13
**Codebase:** Next.js 16 / React 19 / Tailwind CSS 4 / TypeScript 5
**Files audited:** 28 source files (excluding `node_modules`, `.next`)
**ESLint:** 0 errors, 0 warnings
**TypeScript:** 0 errors (`tsc --noEmit`)
**Scope:** This audit excludes Tailwind CSS refactors (class consolidation, border color deduplication, etc.) — those are tracked separately.

---

## Open Issues

### React

- [x] **#1** `[Medium]` **`app/components/Navbar.tsx:25`** — `setTimeout` in `useCopyLink` has no cleanup. If the component unmounts before the 2 s timeout fires, `setCopied(false)` will attempt to update unmounted state.
  **Fix:** Store the timeout ID in a `useRef`, clear it in a `useEffect` cleanup return.

- [x] **#2** `[Low]` **`app/components/ConceptSidebar.tsx:89-94`** — `useEffect` calls `setExpandedSlugs` inside a `concepts.forEach()` loop, potentially triggering multiple state updates per pathname change.
  **Fix:** Batch into a single state update — compute the new slugs array first, then call `setExpandedSlugs` once.

- [x] **#3** `[Low]` **`app/components/ui/CodeBlock.tsx:50-54`** — `codeToHtml()` promise has no `.catch()` handler. If Shiki fails (e.g. unsupported language), the rejection is unhandled. The plain-text fallback already renders, but the error is silently swallowed.
  **Fix:** Add `.catch()` that logs the error. No UI change needed — the `<pre>` fallback covers the display.

### YAGNI

- [x] **#4** `[Low]` **`app/lib/concepts.ts:20`** — The `status: "available" | "coming-soon"` union type is dead weight. Every concept has `status: "available"`, and `"coming-soon"` is never used anywhere. `Navbar.tsx:10` filters by `status === "available"` — a no-op filter.
  **Fix:** Remove the `status` field from the `Concept` type and all concept entries. Remove the `.filter()` call in `Navbar.tsx:10`.

### Accessibility

- [x] **#5** `[Low]` **`app/concepts/state/StateDemo.tsx:35`** — The avatar `alt` text is hardcoded to `"Harry Dresden"`, but the displayed name is stateful (defaults to `"Batman"` and is user-editable). The alt text should reflect the actual name.
  **Fix:** `alt={name}` or `` alt={`${name}'s avatar`} ``.

### Next.js

- [x] **#6** `[Medium]` **Missing `app/global-error.tsx`** — `app/error.tsx` catches errors thrown by pages and child components, but not errors thrown by the root `app/layout.tsx` itself. `global-error.tsx` is the only boundary that covers layout-level errors. It must render its own `<html>` and `<body>` tags since the layout is the thing that failed.
  **Fix:** Create `app/global-error.tsx` as a `"use client"` component with a self-contained HTML shell and a reset button.

- [x] **#7** `[Low]` **Missing `app/robots.ts`** — No `robots.txt` metadata route. Search engine crawlers get a 404 for `/robots.txt`.
  **Fix:** Create `app/robots.ts` exporting a `MetadataRoute.Robots` object. Allow all crawlers, reference the sitemap URL.

- [x] **#8** `[Low]` **Missing `app/sitemap.ts`** — No sitemap metadata route. Search engines have no structured way to discover all pages.
  **Fix:** Create `app/sitemap.ts` exporting a `MetadataRoute.Sitemap` array with all concept page URLs.

### Code Consistency

- [x] **#9** `[Low]` **`app/components/ui/Input.tsx:2`**, **`InspectorPanel.tsx:1`**, **`SectionLabel.tsx:1`** — These three UI components import `twMerge` from `tailwind-merge` directly, while `Button.tsx`, `Card.tsx`, and `CodeBlock.tsx` already use `cn()` from `app/lib/cn.ts`. Functionally identical, but inconsistent.
  **Fix:** Replace `import { twMerge } from "tailwind-merge"` with `import { cn } from "@/app/lib/cn"` in all three files and swap the call site.

---

