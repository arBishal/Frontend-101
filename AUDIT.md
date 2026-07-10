# Frontend-101 Codebase Audit Report

**Date:** 2026-07-10
**Auditor:** Claude (Automated)
**Codebase:** frontend-101 (Next.js 16 / React 19 / Tailwind CSS 4 / TypeScript 5)
**Files Audited:** 28 source files (excluding `node_modules`, `.next`)
**Total Issues Found:** 37

---

## Executive Summary

The codebase is **well-structured for its scope** — a small educational site with interactive demos. Code is readable, consistent in style, and reasonably organized. However, there are **3 ESLint errors, 5 ESLint warnings**, and several areas where framework-specific best practices and coding principles are not followed. The issues range from React anti-patterns and accessibility gaps to missed Next.js optimizations and DRY violations.

**Overall Grade: B**
Good for a learning project; needs targeted fixes before being considered production-quality.

---

## Table of Contents

1. [SOLID Principles](#1-solid-principles)
2. [DRY (Don't Repeat Yourself)](#2-dry-dont-repeat-yourself)
3. [KISS (Keep It Simple, Stupid)](#3-kiss-keep-it-simple-stupid)
4. [YAGNI (You Aren't Gonna Need It)](#4-yagni-you-arent-gonna-need-it)
5. [React Best Practices](#5-react-best-practices)
6. [Next.js Best Practices](#6-nextjs-best-practices)
7. [TypeScript Best Practices](#7-typescript-best-practices)
8. [Tailwind CSS Best Practices](#8-tailwind-css-best-practices)
9. [Accessibility (a11y)](#9-accessibility-a11y)
10. [Security](#10-security)
11. [Performance](#11-performance)
12. [ESLint Report](#12-eslint-report)
13. [Full Issue Index](#13-full-issue-index)

---

## 1. SOLID Principles

### Single Responsibility Principle (SRP)

**Mostly followed.**

- Page files (`page.tsx`) correctly separate concerns: they handle metadata and layout, delegating interactivity to dedicated `*Demo.tsx` components.
- `ThemeProvider.tsx` handles theme resolution, persistence, and system preference listening — all theme-related, so this is acceptable.

**Violations:**

| # | File | Issue |
|---|---|---|
| **#1** | `Navbar.tsx` (lines 18-27) | Mixes navigation rendering with progress-bar calculation logic and URL share/clipboard logic. The progress calculation and share handler could be extracted. |
| **#2** | `ConceptSidebar.tsx` (lines 43-117) | The `map` render body is ~70 lines with nested conditionals. The per-item rendering logic should be extracted into a separate component (e.g., `SidebarItem`). |
| **#3** | `ResponsiveDemo.tsx` (lines 119-183) | The mock preview UI (navbar, hero, cards, footer) is all inline. Each mock section could be a small sub-component for clarity, though this is minor given the demo nature. |

### Open/Closed Principle (OCP)

**Followed well.**

- `Button.tsx` uses a variant map (`solid`, `outline`, `ghost`) that is easy to extend without modifying existing logic.
- `CodeBlock.tsx` supports both single and tabbed modes via discriminated union props — extensible pattern.
- `concepts.ts` acts as a config-driven data source — adding a new concept requires only appending to the array.

### Liskov Substitution / Interface Segregation / Dependency Inversion

These are less applicable to a React component codebase of this size. No violations observed. The component prop types are appropriately scoped.

---

## 2. DRY (Don't Repeat Yourself)

**Several violations found.**

| # | Pattern | Locations | Suggestion |
|---|---|---|---|
| **#4** | Page layout boilerplate | Every `page.tsx` under `concepts/` repeats the same wrapper structure: heading `<h1>`, description `<p>`, "Interactive demo" label, "How it works" section | Extract a shared `ConceptPageLayout` component that accepts `title`, `description`, `demo`, and `explanation` as props/slots |
| **#5** | Section label pattern | `font-mono uppercase tracking-wide font-medium text-zinc-500 dark:text-zinc-300` is repeated 12+ times across page files | Extract a `<SectionLabel>` component or define a Tailwind `@apply` class |
| **#6** | Inspector panel pattern | `StateDemo.tsx` (lines 85-103) and `ApiDemo.tsx` (lines 164-213) both render a dark inspector sidebar with identical structure and styling | Extract a shared `InspectorPanel` component |
| **#7** | Dark mode border color | `border-zinc-200 dark:border-zinc-800` appears 30+ times across the codebase | Consider a CSS custom property or a Tailwind component class |
| **#8** | Card wrapper pattern | `rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 space-y-5` (or close variants) repeated across demos | Could be a `<Card>` UI component |

---

## 3. KISS (Keep It Simple, Stupid)

**Generally followed.** The codebase is straightforward and avoids over-abstraction.

**Minor concerns:**

| # | File | Issue |
|---|---|---|
| **#9** | `ConceptSidebar.tsx` (lines 63-79) | The conditional logic for rendering a `<button>` vs `<Link>` based on `hasChildren && !isExpanded` is complex. A simpler approach: always render the `<Link>` and handle expand via the chevron button only. |
| **#10** | `ResponsiveDemo.tsx` (lines 46-70) | Drag-resize uses manual `pointermove`/`pointerup` listeners added to `document`. This works but is unnecessarily imperative. A custom hook (`useDrag` or `useResize`) would encapsulate this cleanly. |
| **#11** | `Button.tsx` (lines 19-29) | The discriminated union with `href?: never` and `href: string` is clever but adds complexity. Simpler: just use `href?: string` and branch on its truthiness (which is already done at line 34). |

---

## 4. YAGNI (You Aren't Gonna Need It)

**Well followed.** No unnecessary abstractions, unused utilities, or speculative features found. The codebase is lean.

**One minor observation:**

| # | File | Issue |
|---|---|---|
| **#12** | `concepts.ts` (line 20) | The `status: "available" \| "coming-soon"` field exists but `"coming-soon"` is never used. Every concept is `"available"`. If no concepts are planned as coming-soon, this adds dead complexity. |

---

## 5. React Best Practices

### Errors (from ESLint)

| # | File | Issue |
|---|---|---|
| **#13** | `ThemeProvider.tsx:39` | `setResolvedTheme()` called synchronously inside `useEffect`. This triggers cascading renders. Should use `useSyncExternalStore` or initialize state from a function. |
| **#14** | `CodeBlock.tsx:41` | `setHtml("")` called synchronously inside `useEffect`. Should reset via the dependency change rather than calling setState at the top of the effect. |
| **#15** | `StateDemo.tsx:25` | `setAvatarSeed()` called synchronously inside `useEffect`. Should use lazy initial state: `useState(() => Math.random().toString(36).slice(2))` — though this causes hydration mismatch, the current approach triggers an unnecessary re-render. |

### Warnings & Anti-Patterns

| # | File | Issue | Recommendation |
|---|---|---|---|
| **#16** | `ConceptSidebar.tsx:35` | `next.has(slug) ? next.delete(slug) : next.add(slug)` — ternary used for side effects, not value | Use an `if/else` statement instead |
| **#17** | `FrameworkDemo.tsx:134` | `Date.now()` used as todo ID | Not stable for concurrent rendering. Use `crypto.randomUUID()` |
| **#18** | Multiple files | No `useCallback` on event handlers passed to child components. `ResponsiveDemo.tsx` passes `handlePresetClick` inline; `FrameworkDemo.tsx` passes `toggle` and `remove` inline. | Wrap in `useCallback` to avoid unnecessary child re-renders |

### Missing Patterns

| # | Pattern | Details |
|---|---|---|
| **#19** | No error boundaries | No `error.tsx` files exist in any route segment. If a demo throws, the entire app crashes. |
| **#20** | No loading states | No `loading.tsx` files for route transitions. |
| **#21** | `ConceptCard.tsx` is not a link | The card renders a `<div>` but conceptually should be clickable to navigate to the concept. It's visually styled as interactive (`hover:` effects) but has no `href`. |

---

## 6. Next.js Best Practices

### Image Optimization

| # | File | Issue |
|---|---|---|
| **#22** | `AccessibilityDemo.tsx:37` | Uses `<img>` instead of `next/image`. Should use `<Image>` for automatic optimization. |
| **#23** | `ApiDemo.tsx:130` | Uses `<img>` for Pokemon sprites. Should use `<Image>` with `unoptimized` for external pixel art. |
| **#24** | `StateDemo.tsx:35` | Uses `<img>` for DiceBear avatar. Should use `<Image>` with appropriate `remotePatterns` config. |

### Metadata

| # | Issue |
|---|---|
| **#25** | No `opengraph-image`, `twitter-card`, or `robots.txt` configuration. No favicon setup beyond defaults. Every page correctly exports `Metadata` with `title` and `description` (positive). |

### Route Organization

| # | Issue |
|---|---|
| **#26** | No `not-found.tsx` for custom 404 pages. (See also [#19] for missing `error.tsx`.) |

### Server vs Client Components

| # | File | Issue |
|---|---|---|
| **#27** | `ConceptNav.tsx` | Is a Client Component solely because of `usePathname()`. Consider making the active-link logic server-side or accepting `pathname` as a prop from a thin client wrapper to reduce the client bundle. |

### `dangerouslySetInnerHTML` Usage

| # | File | Issue |
|---|---|---|
| **#28** | `layout.tsx:34` | Inline `<script>` for theme flash prevention uses `dangerouslySetInnerHTML`. This is a known pattern but the script string should ideally be in a separate constant for readability. |

> Note: `CodeBlock.tsx:94` also uses `dangerouslySetInnerHTML` with Shiki output. This is standard for syntax highlighters and the HTML comes from a trusted library — acceptable.

---

## 7. TypeScript Best Practices

**Generally well-typed.** Strict mode is enabled in `tsconfig.json`. Zero type errors.

| # | File | Issue | Recommendation |
|---|---|---|---|
| **#29** | `ApiDemo.tsx:77` | `json.types.map((t: { type: { name: string } }) => t.type.name)` — inline type annotation on untyped `json` response | Define a `PokemonApiResponse` type for the full API response shape |
| **#30** | `ConceptSidebar.tsx:11` | `useState<Set<string>>` — `Set` in React state can cause subtle bugs because `Set` mutations don't trigger re-renders. The code correctly creates new `Set` instances, but `Map`/`Set` in state is a known footgun | Consider using `string[]` with `.includes()` for simplicity |
| **#31** | `landscape/page.tsx:81` | Destructured render variable `darkInvert` has an implicit `undefined` type that flows into a template literal | Not a bug, but a `?? false` would make intent clearer |

**Good practices observed:**
- `Readonly<{ children: React.ReactNode }>` for root layout props
- Discriminated unions for `CodeBlock` and `Button` props
- `as const` for readonly data arrays (e.g., `PRESETS` in `ResponsiveDemo.tsx`)

---

## 8. Tailwind CSS Best Practices

### String Concatenation vs `clsx`/`cn`

| # | Issue | Locations |
|---|---|---|
| **#32** | No `cn()` utility — conditional classes are built via template literal concatenation, which is fragile and can cause Tailwind class conflicts | `ConceptSidebar.tsx` (lines 55-61, 103-106), `CodeBlock.tsx` (lines 61-64), `ComponentDemo.tsx` (lines 20-24, 27-29), `AccessibilityDemo.tsx` (lines 55-59, 114-115) |

**Recommendation:** Use `tailwind-merge` (already installed) with a `cn()` utility combining `clsx` + `twMerge` for consistent conditional class handling. This prevents class conflicts and is the community standard pattern.

### Hardcoded Values

The CLAUDE.md explicitly says: *"Don't use hardcoded values for tailwind classes."*

| # | File | Line | Issue |
|---|---|---|---|
| **#33** | `ComponentDemo.tsx` | 27 | `text-[10px]` — hardcoded font size. Use `text-xs` (12px) or define a custom size in theme. |
| **#34** | `AccessibilityDemo.tsx` | 47 | `text-[10px]` — same issue. |

### Dark Mode & Responsive Design

- Dark mode is consistently applied via `dark:` variants throughout — well done.
- The `@custom-variant` setup in `globals.css` for class-based dark mode is correct for Tailwind CSS v4.
- Responsive breakpoints are used consistently (`sm:`, `md:`, `lg:`). Mobile-first approach is correctly followed.

---

## 9. Accessibility (a11y)

Ironic for a project that teaches accessibility — some a11y issues exist in the codebase itself:

| # | File | Issue |
|---|---|---|
| **#35** | `AccessibilityDemo.tsx:37` | `<img>` conditionally has `alt=""` (empty string) when `altText` fix is off — ESLint warns. The demo intentionally shows bad practice, but the base state should still have `alt=""` (decorative) rather than omitting it entirely to avoid the ESLint warning. |
| **#21** | `ConceptCard.tsx` | (Also listed under React) Cards have hover effects but are not focusable/clickable — no keyboard interaction possible. They look interactive but aren't. |
| **#36** | `ResponsiveDemo.tsx:187` | Drag handle has no `aria-label` or `role`. Screen reader users won't know it's a resize control. |

**Positive notes:**
- `CodeBlock.tsx:84` — `aria-hidden` used correctly on line numbers.
- `Navbar.tsx:51-58` — Share and theme buttons have proper `aria-label`.

---

## 10. Security

**No high-severity security issues found.**

| # | File | Issue | Severity |
|---|---|---|---|
| **#28** | `layout.tsx:34` | (Also listed under Next.js) `dangerouslySetInnerHTML` with an inline script. The content is a static string (no user input), so no XSS risk. But if this string were ever to include dynamic data, it would be a vulnerability. | Low |
| **#37** | `ApiDemo.tsx:51` | User input (`query`) is passed into a URL path segment. `fetch()` URL is constructed from user input. While the API is external and read-only, there's no input validation beyond `.trim().toLowerCase()`. | Low |

> `CodeBlock.tsx:94` uses `dangerouslySetInnerHTML` with Shiki output. Shiki is trusted, so acceptable.
> `Navbar.tsx:24` — `navigator.clipboard.writeText(window.location.href)` — safe, no injection vector.

---

## 11. Performance

| # | File | Issue | Impact |
|---|---|---|---|
| **#38** | `CodeBlock.tsx:42` | `codeToHtml()` from Shiki is called on every tab change and re-render. This is a heavy operation (parses + highlights). Results should be cached (e.g., `useMemo` or a `Map` cache). | Medium |
| **#39** | `ResponsiveDemo.tsx:21-33` | `window.addEventListener("resize", updateMax)` — no debounce. Fires on every pixel of window resize. | Low-Medium |
| **#40** | `ApiDemo.tsx` | No request cancellation — if the user fires multiple fetches rapidly, stale responses could overwrite newer ones. Should use `AbortController`. | Low-Medium |

---

## 12. ESLint Report

```
3 errors, 5 warnings

Errors:
  ThemeProvider.tsx:39     react-hooks/set-state-in-effect    [#13]
  CodeBlock.tsx:41         react-hooks/set-state-in-effect    [#14]
  StateDemo.tsx:25         react-hooks/set-state-in-effect    [#15]

Warnings:
  ConceptSidebar.tsx:35    @typescript-eslint/no-unused-expressions  [#16]
  AccessibilityDemo.tsx:37 @next/next/no-img-element                 [#22]
  AccessibilityDemo.tsx:37 jsx-a11y/alt-text                         [#35]
  ApiDemo.tsx:130          @next/next/no-img-element                  [#23]
  StateDemo.tsx:35         @next/next/no-img-element                  [#24]
```

**TypeScript: 0 errors** (clean `tsc --noEmit`)

---

## 13. Full Issue Index

### Critical (Must Fix)

| # | Issue | File(s) | Category |
|---|---|---|---|
| #13 | `setState` called synchronously in `useEffect` | `ThemeProvider.tsx` | React |
| #14 | `setState` called synchronously in `useEffect` | `CodeBlock.tsx` | React |
| #15 | `setState` called synchronously in `useEffect` | `StateDemo.tsx` | React |

### High (Should Fix)

| # | Issue | File(s) | Category |
|---|---|---|---|
| #4 | Page layout boilerplate repeated 6 times | All `concepts/*/page.tsx` | DRY |
| #19 | No `error.tsx` error boundaries | `app/` directory | React / Next.js |
| #22 | `<img>` instead of `next/image` | `AccessibilityDemo.tsx` | Next.js |
| #23 | `<img>` instead of `next/image` | `ApiDemo.tsx` | Next.js |
| #24 | `<img>` instead of `next/image` | `StateDemo.tsx` | Next.js |
| #40 | No `AbortController` for fetch — race condition risk | `ApiDemo.tsx` | Performance |

### Medium (Recommended)

| # | Issue | File(s) | Category |
|---|---|---|---|
| #1 | Navbar mixes navigation + progress + share logic | `Navbar.tsx` | SRP |
| #2 | Sidebar render body too complex (~70 lines) | `ConceptSidebar.tsx` | SRP |
| #5 | Section label class pattern repeated 12+ times | Multiple page files | DRY |
| #6 | Inspector panel pattern duplicated | `StateDemo.tsx`, `ApiDemo.tsx` | DRY |
| #7 | `border-zinc-200 dark:border-zinc-800` repeated 30+ times | Codebase-wide | DRY |
| #8 | Card wrapper pattern repeated across demos | Multiple demo files | DRY |
| #9 | Overly complex `<button>` vs `<Link>` conditional | `ConceptSidebar.tsx` | KISS |
| #21 | `ConceptCard` looks interactive but isn't a link | `ConceptCard.tsx` | React / a11y |
| #25 | No OpenGraph, Twitter card, or robots.txt | `layout.tsx` | Next.js |
| #26 | No `not-found.tsx` for custom 404 | `app/` directory | Next.js |
| #29 | Untyped API response — inline type annotation | `ApiDemo.tsx` | TypeScript |
| #32 | No `cn()` utility — fragile conditional class strings | Multiple components | Tailwind |
| #33 | Hardcoded Tailwind value `text-[10px]` | `ComponentDemo.tsx` | Tailwind |
| #34 | Hardcoded Tailwind value `text-[10px]` | `AccessibilityDemo.tsx` | Tailwind |
| #35 | Conditional `alt` attribute triggers ESLint warning | `AccessibilityDemo.tsx` | a11y |
| #36 | Drag handle missing ARIA attributes | `ResponsiveDemo.tsx` | a11y |
| #38 | Shiki `codeToHtml()` not cached — re-parses on each render | `CodeBlock.tsx` | Performance |
| #39 | Resize listener not debounced | `ResponsiveDemo.tsx` | Performance |

### Low (Nice to Have)

| # | Issue | File(s) | Category |
|---|---|---|---|
| #3 | Mock preview sections all inline in one component | `ResponsiveDemo.tsx` | SRP |
| #10 | Imperative drag logic could be a custom hook | `ResponsiveDemo.tsx` | KISS |
| #11 | `Button` discriminated union with `never` adds complexity | `Button.tsx` | KISS |
| #12 | `status: "coming-soon"` type variant never used | `concepts.ts` | YAGNI |
| #16 | Ternary used for side effects instead of `if/else` | `ConceptSidebar.tsx` | React |
| #17 | `Date.now()` as key — not stable for concurrent rendering | `FrameworkDemo.tsx` | React |
| #18 | No `useCallback` on handlers passed to children | Multiple files | React |
| #20 | No `loading.tsx` for route transitions | `app/` directory | Next.js |
| #27 | `ConceptNav` is client-side only for `usePathname` | `ConceptNav.tsx` | Next.js |
| #28 | Inline script string in `dangerouslySetInnerHTML` | `layout.tsx` | Next.js / Security |
| #30 | `Set` in React state — known footgun | `ConceptSidebar.tsx` | TypeScript |
| #31 | `darkInvert` implicit `undefined` in template literal | `landscape/page.tsx` | TypeScript |
| #37 | User input in fetch URL with minimal validation | `ApiDemo.tsx` | Security |

---

## What's Done Well

- **Clean project structure** — App Router used correctly with co-located components and demo files
- **TypeScript strict mode** — enabled and zero type errors
- **Discriminated union props** — `Button` and `CodeBlock` use this pattern effectively
- **Consistent design system** — zinc color palette, consistent spacing, dark mode throughout
- **Server/Client Component split** — `"use client"` only where needed (interactive demos)
- **Proper metadata** — every page has unique `title` and `description`
- **External link security** — `rel="noopener noreferrer"` on all external links
- **Tailwind Merge** — used in reusable UI components (`Button`, `Input`) for class conflict resolution
- **Config-driven data** — `concepts.ts` centralizes navigation data
- **Correct `as const`** — readonly data arrays like `PRESETS`
- **Proper ARIA usage** — `aria-hidden` on decorative elements, `aria-label` on icon buttons

---

## 14. Refactoring Strategy

This section is a step-by-step execution plan organized into **7 phases**. Phases are ordered by dependency — earlier phases create utilities and components that later phases consume. **Do not skip ahead.** After each phase, run `npx eslint .` and `npx tsc --noEmit` to verify nothing is broken.

### Ground Rules

- **Do not change visual appearance or behavior.** Every fix is an internal refactor unless stated otherwise.
- **One commit per phase.** This keeps changes reviewable and revertable.
- **Read each file fully before editing.** The line numbers in this doc are from the audit snapshot and may drift after earlier phases modify the same file.
- **Follow existing conventions:** Tailwind utility classes, TypeScript strict mode, `"use client"` only where hooks are used, App Router patterns.
- **Read `node_modules/next/dist/docs/` before using any unfamiliar Next.js 16 API.** This version has breaking changes from earlier Next.js.

---

### Phase 1 — Foundations (utilities other phases depend on)

> **Issues addressed:** #32, #7
> **Files to create:** `app/lib/cn.ts`
> **Files to modify:** `app/globals.css`
> **Depends on:** nothing

**Step 1.1 — Create `cn()` utility [#32]**

Create `app/lib/cn.ts`:
```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install the missing dependency:
```bash
npm install clsx
```

> This utility is the foundation for all conditional class logic going forward. Every component that currently uses template literal class concatenation should be migrated to `cn()` in the phase where that component is touched. **Do not do a bulk find-and-replace** — migrate each component when it's already being edited in its respective phase.

**Step 1.2 — Add CSS custom property for repeated border color [#7]**

In `app/globals.css`, inside the existing `:root` and `.dark` blocks, add:
```css
:root {
  --border: #e4e4e7;  /* zinc-200 */
}
.dark {
  --border: #27272a;  /* zinc-800 */
}
```

And inside the `@theme inline` block, add:
```css
--color-border: var(--border);
```

> After this, components can use `border-border` instead of `border-zinc-200 dark:border-zinc-800`. Migrate usage file-by-file in later phases as each component is touched — **not** as a bulk replacement.

**Verification:** `npx tsc --noEmit` passes. `npm run dev` starts without errors.

---

### Phase 2 — Fix Critical ESLint Errors

> **Issues addressed:** #13, #14, #15
> **Files to modify:** `ThemeProvider.tsx`, `CodeBlock.tsx`, `StateDemo.tsx`
> **Depends on:** nothing (can run in parallel with Phase 1)

These are the 3 `react-hooks/set-state-in-effect` errors. Each needs a different approach.

**Step 2.1 — Fix ThemeProvider [#13]**

File: `app/components/ThemeProvider.tsx`

The problem: `setResolvedTheme(resolved)` is called synchronously at the top of the `useEffect` body (line 39).

Fix approach: Move the initial theme resolution into the state initializer. Since `window` is not available during SSR, use a lazy initializer that returns `"light"` as the SSR default, then let the `useEffect` only handle the media query subscription (where `setState` inside the `onSystemChange` callback is fine — it's in an event listener, not synchronous in the effect body).

```tsx
const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

// Replace the useEffect with:
useEffect(() => {
  // Resolve initial theme from localStorage (runs once on mount)
  const stored = localStorage.getItem("theme");
  const initial: ResolvedTheme =
    stored === "dark" ? "dark" :
    stored === "light" ? "light" :
    getSystemTheme();
  setResolvedTheme(initial);  // ← THIS IS THE PROBLEM LINE
  applyTheme(initial);
```

The fix: split into two parts. Use a `useRef` to track whether we've initialized, and call `applyTheme` directly (it's a DOM mutation, not state). For the initial `setResolvedTheme`, consider using `useSyncExternalStore` with `localStorage` + `matchMedia` as the external store, or restructure so the synchronous setState is avoided. The simplest fix that satisfies the lint rule:

- Remove the synchronous `setResolvedTheme(initial)` call
- Instead, compute `initial` inside the state initializer: `useState<ResolvedTheme>(() => "light")` stays as-is for SSR
- Use a layout effect or `useInsertionEffect` for the one-time DOM sync, or suppress with a ref guard
- Keep the `mq.addEventListener("change", onSystemChange)` subscription as-is (callback-based setState is allowed)

> **Important:** The theme flash prevention script in `layout.tsx` already handles the visual state on first paint. The React state just needs to catch up without triggering a cascading render. The cleanest React 19 approach is `useSyncExternalStore` reading from `document.documentElement.classList.contains("dark")` as the snapshot.

**Step 2.2 — Fix CodeBlock [#14]**

File: `app/components/ui/CodeBlock.tsx`

The problem: `setHtml("")` at line 41 is synchronous setState in an effect.

Fix: Remove the `setHtml("")` line. Instead, derive the "empty/loading" state from whether `html` corresponds to the current `code`/`lang`. The simplest approach:

- Track both the resolved HTML and its source key: `useState<{ key: string; html: string } | null>(null)`
- In the effect, call `codeToHtml(...)` and only call `setHtml` inside the `.then()` callback (which is async, satisfying the rule)
- Render the raw `<pre>` fallback when the stored key doesn't match the current `code + lang` combo

Alternative (simpler): just remove `setHtml("")` and let the stale HTML show until the new one arrives. The visual flicker is minimal and the lint error goes away.

**Step 2.3 — Fix StateDemo [#15]**

File: `app/concepts/state/StateDemo.tsx`

The problem: `setAvatarSeed(...)` at line 25 is synchronous setState in an effect.

Fix: This effect exists solely to generate a random seed on the client to avoid hydration mismatch. The simplest fix:

- Use `useId()` from React as the seed instead of `Math.random()`. `useId()` is deterministic across server/client, so no hydration mismatch and no effect needed at all.
- Remove the `useEffect` and the `avatarSeed` state entirely.

```tsx
import { useId } from "react";
// ...
const avatarSeed = useId();
```

Then remove the conditional rendering (the `avatarSeed ?` ternary) — just always render the `<img>`.

> **Note:** `useId()` produces strings like `:r1:` which work fine as DiceBear seeds.

**Verification:** `npx eslint .` — the 3 errors should be gone. Warnings may remain (addressed in later phases).

---

### Phase 3 — Extract Shared UI Components (DRY)

> **Issues addressed:** #5, #8, #6, #33, #34
> **Files to create:** `app/components/ui/SectionLabel.tsx`, `app/components/ui/Card.tsx`, `app/components/ui/InspectorPanel.tsx`
> **Depends on:** Phase 1 (uses `cn()`)

**Step 3.1 — Create `<SectionLabel>` [#5]**

Create `app/components/ui/SectionLabel.tsx`:

A Server Component (no `"use client"`) that renders a styled `<p>` tag. Props: `children: React.ReactNode`, optional `className`.

Target classes: `font-mono uppercase tracking-wide font-medium text-zinc-500 dark:text-zinc-300`

Use `cn()` from `app/lib/cn.ts` to merge with any passed `className`.

> **Do not** replace usages yet — that happens in Phase 4 when page files are refactored.

**Step 3.2 — Create `<Card>` [#8]**

Create `app/components/ui/Card.tsx`:

A Server Component wrapping a `<div>`. Props: `children`, optional `className`.

Target classes: `rounded-lg border border-border p-5 sm:p-6` (using the new `border-border` from Phase 1).

Use `cn()` for class merging so consumers can override padding, spacing, etc.

**Step 3.3 — Create `<InspectorPanel>` [#6]**

Create `app/components/ui/InspectorPanel.tsx`:

A Server Component. Props: `title: string`, `children: React.ReactNode`, optional `className`.

Extracts the shared pattern from `StateDemo.tsx` (lines 85-103) and `ApiDemo.tsx` (lines 164-213):
- Dark background container: `rounded-lg bg-zinc-900 dark:bg-zinc-800 p-4 font-mono text-sm`
- Title row: `text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-3`
- Children slot for the key-value rows

> The individual key-value rows differ between demos, so they stay as children — only the wrapper is shared.

**Step 3.4 — Replace hardcoded `text-[10px]` [#33, #34]**

In `app/globals.css`, inside the `@theme inline` block, add a custom font size:
```css
--text-2xs: 0.625rem;
```

Then in the two files that use `text-[10px]`:
- `app/components/ComponentDemo.tsx` line 27 — change `text-[10px]` to `text-2xs`
- `app/concepts/accessibility/AccessibilityDemo.tsx` line 47 — change `text-[10px]` to `text-2xs`

**Verification:** `npx tsc --noEmit` passes. Visually spot-check that SectionLabel, Card, and InspectorPanel render correctly if you temporarily use them in one page.

---

### Phase 4 — Deduplicate Concept Pages

> **Issues addressed:** #4 (primary), uses #5 components
> **Files to modify:** All 6 `concepts/*/page.tsx` files
> **Depends on:** Phase 3 (uses `SectionLabel`)

**Step 4.1 — Assess whether a shared layout component is appropriate**

All 6 concept page files follow the same structure:
```
<div className="flex flex-col gap-8 text-sm lg:text-base">
  <div className="space-y-2">
    <h1>Title</h1>
    <p>Description</p>
  </div>
  <div>
    <SectionLabel>Interactive demo</SectionLabel>
    <DemoComponent />
  </div>
  <div>
    <SectionLabel>How it works</SectionLabel>
    <p>Explanation paragraphs...</p>
    <ul>Explanation list...</ul>
  </div>
</div>
```

However, `frameworks/page.tsx` and `frameworks/landscape/page.tsx` deviate — they have multiple prose sections and no "Interactive demo" / "How it works" split. So a rigid shared wrapper with named slots would be over-engineered.

**Recommended approach:** Do **not** create a `ConceptPageLayout` wrapper. Instead:
1. Replace the repeated section label strings with `<SectionLabel>` from Step 3.1
2. Replace the repeated outer `<div>` wrapper classes with a CSS class or shared constant
3. Leave the page content structure as-is since each page's content is unique enough

Create a constant in `app/lib/cn.ts` or a small file:
```ts
export const pageWrapper = "flex flex-col gap-8 text-sm lg:text-base";
export const pageHeader = "space-y-2";
export const pageTitle = "text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50";
export const pageDescription = "text-zinc-600 dark:text-zinc-400";
```

Then update each page file to import these + use `<SectionLabel>`. This deduplicates without over-abstracting.

**Verification:** All 6 concept pages render identically to before. `npx eslint .` has no new issues.

---

### Phase 5 — Component Refactors (SRP, KISS, a11y)

> **Issues addressed:** #2, #9, #16, #30, #1, #21, #35, #36, #17, #29, #31
> **Depends on:** Phase 1 (uses `cn()`), Phase 3 (uses `Card`, `InspectorPanel`)

This phase touches many files but each fix is independent. Work through them one file at a time.

**Step 5.1 — Refactor ConceptSidebar [#2, #9, #16, #30]**

File: `app/components/ConceptSidebar.tsx`

Four issues in one file — fix together:

1. **[#2] Extract `SidebarItem` sub-component.** Move the body of the `.map()` callback (lines 52-116) into a new component `SidebarItem` defined in the same file (above the default export). Props: `concept: Concept`, `pathname: string`, `isExpanded: boolean`, `onToggleExpand: (slug: string) => void`.

2. **[#9] Simplify button vs Link conditional.** In the extracted `SidebarItem`, always render the icon + label as a `<Link href={href}>`. The chevron button handles expand/collapse independently. Remove the `hasChildren && !isExpanded` branching that currently swaps between `<button>` and `<Link>`.

3. **[#16] Replace ternary with if/else.** In `toggleExpanded`, change:
   ```ts
   next.has(slug) ? next.delete(slug) : next.add(slug);
   ```
   to:
   ```ts
   if (next.has(slug)) {
     next.delete(slug);
   } else {
     next.add(slug);
   }
   ```

4. **[#30] Replace `Set<string>` with `string[]`.** Change `expandedSlugs` state from `Set<string>` to `string[]`. Update `toggleExpanded` to use `.filter()` / spread. Update `.has()` checks to `.includes()`.

Also: migrate all template-literal class concatenation in this file to use `cn()` [#32].

**Step 5.2 — Refactor Navbar [#1]**

File: `app/components/Navbar.tsx`

Extract the progress calculation into a small pure function (can be defined above the component):
```ts
function getProgressPct(pathname: string): number { ... }
```

Extract the share handler logic — it's small enough to stay in the component, but move the `copied`/`setCopied` logic into a tiny `useCopyToClipboard` hook or just leave inline. The main goal is making the render body shorter and each concern identifiable.

Migrate class concatenation to `cn()` [#32].

**Step 5.3 — Make ConceptCard a link [#21]**

File: `app/components/ConceptCard.tsx`

Wrap the card in a `<Link href={"/concepts/" + concept.slug}>`. The card already has hover styles — they should now apply to a focusable, keyboard-navigable element. Update the outer element from `<div>` to the `<Link>` and keep the same classes. This also fixes the a11y concern.

**Step 5.4 — Fix AccessibilityDemo alt text [#35]**

File: `app/concepts/accessibility/AccessibilityDemo.tsx`

The `<img>` at line 37 conditionally spreads `alt`. Change to always have `alt=""` in the base (decorative fallback), then override to `alt="Wikipedia logo"` when `fixes.altText` is true. This silences the ESLint `jsx-a11y/alt-text` warning while preserving the demo's teaching purpose.

Also migrate to `cn()` for conditional classes [#32].

**Step 5.5 — Add ARIA to drag handle [#36]**

File: `app/concepts/responsiveness/ResponsiveDemo.tsx`

Add `role="separator"` and `aria-label="Resize preview"` and `aria-orientation="vertical"` to the drag handle `<div>` at line 187.

**Step 5.6 — Fix FrameworkDemo todo ID [#17]**

File: `app/concepts/frameworks/see-the-diff/FrameworkDemo.tsx`

Change `id: Date.now()` at line 134 to `id: crypto.randomUUID()`. Update the `Todo` type's `id` field from `number` to `string`. Update `toggle(id: number)` and `remove(id: number)` parameter types to `string`.

**Step 5.7 — Type the API response [#29]**

File: `app/concepts/api-calls/ApiDemo.tsx`

Add a type above the component:
```ts
type PokemonApiResponse = {
  name: string;
  sprites: { front_default: string };
  types: Array<{ type: { name: string } }>;
};
```

Use it: `const json: PokemonApiResponse = await response.json();`

Remove the inline type annotation from the `.map()` call.

Also: use `InspectorPanel` from Phase 3 to replace the duplicated inspector wrapper [#6]. Keep the key-value rows as children.

**Step 5.8 — Use InspectorPanel in StateDemo [#6]**

File: `app/concepts/state/StateDemo.tsx`

Replace the inspector wrapper div (lines 85-103) with `<InspectorPanel title="State Inspector">`. Keep the key-value row children as-is.

**Step 5.9 — Fix `darkInvert` implicit undefined [#31]**

File: `app/concepts/frameworks/landscape/page.tsx`

In the destructured `.map()` callback at line 81, default `darkInvert` to `false`:
```ts
{ name, icon, philosophy, users, url, colorOverride, darkInvert = false }
```

**Verification:** `npx eslint .` — the `jsx-a11y/alt-text` and `no-unused-expressions` warnings should be gone. `npx tsc --noEmit` clean. Visually verify sidebar navigation, concept cards, and all demos still work.

---

### Phase 6 — Next.js Compliance

> **Issues addressed:** #22, #23, #24, #19, #26, #20, #28
> **Files to create:** `app/concepts/error.tsx`, `app/not-found.tsx`, `app/concepts/loading.tsx`
> **Files to modify:** `next.config.ts`, `AccessibilityDemo.tsx`, `ApiDemo.tsx`, `StateDemo.tsx`, `layout.tsx`
> **Depends on:** Phase 2 (StateDemo was already modified)

**Step 6.1 — Configure `remotePatterns` in next.config.ts**

Add remote patterns for the three external image domains used:
```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "api.dicebear.com" },
      { hostname: "raw.githubusercontent.com" },
      { hostname: "cdn.simpleicons.org" },
    ],
  },
};
```

> **Important:** Read `node_modules/next/dist/docs/` to confirm the Next.js 16 `remotePatterns` API shape — it may differ from earlier versions.

**Step 6.2 — Replace `<img>` with `<Image>` [#22, #23, #24]**

- `AccessibilityDemo.tsx` [#22]: Replace `<img>` with `<Image>` from `next/image`. Set `width={40} height={40}`. The conditional `alt` is already fixed in Phase 5.
- `ApiDemo.tsx` [#23]: Replace the Pokemon sprite `<img>` with `<Image>`. Use `unoptimized` prop since these are pixel-art PNGs. Set explicit `width` and `height`.
- `StateDemo.tsx` [#24]: Replace the DiceBear `<img>` with `<Image>`. Set `width={56} height={56}` (matches `size-14`). Use `unoptimized` since DiceBear returns SVGs.

**Step 6.3 — Add error boundary [#19]**

Create `app/concepts/error.tsx`:
```tsx
"use client";

export default function ConceptError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Something went wrong
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {error.message}
      </p>
      <button
        onClick={reset}
        className="text-sm font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-2"
      >
        Try again
      </button>
    </div>
  );
}
```

> Style it to match the existing design system. Keep it minimal.

**Step 6.4 — Add not-found page [#26]**

Create `app/not-found.tsx`:

A Server Component with a centered message ("Page not found") and a `<Link>` back to `/`. Match existing typography and color conventions.

**Step 6.5 — Add loading skeleton [#20]**

Create `app/concepts/loading.tsx`:

A Server Component rendering a simple pulsing skeleton (e.g., a few `animate-pulse` divs matching the page layout shape). Keep it lightweight.

**Step 6.6 — Extract inline script to constant [#28]**

File: `app/layout.tsx`

Move the theme flash prevention script string from the inline `dangerouslySetInnerHTML` at line 34 into a named constant above the component:
```ts
const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');...})();`;
```

Then reference it: `dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}`

**Verification:** `npx eslint .` — the 3 `@next/next/no-img-element` warnings should be gone. Navigate to a non-existent route and verify the 404 page. `npm run build` should complete without errors.

---

### Phase 7 — Performance & Final Polish

> **Issues addressed:** #38, #40, #39, #37, #10, #11, #12, #18, #25, #27
> **Depends on:** All previous phases

**Step 7.1 — Cache Shiki output [#38]**

File: `app/components/ui/CodeBlock.tsx`

The `codeToHtml()` call inside `useEffect` re-parses on every render. Fix:

Use a `useRef<Map<string, string>>()` as a cache keyed by `${lang}:${code}`. Before calling `codeToHtml`, check the cache. On cache hit, set HTML directly from cache (inside `.then()` to stay async). On miss, call `codeToHtml` and store the result.

This is preferable to `useMemo` because `codeToHtml` is async.

**Step 7.2 — Add AbortController to fetch [#40]**

File: `app/concepts/api-calls/ApiDemo.tsx`

In `handleFetch()`, create an `AbortController` and pass its `signal` to `fetch()`. Store the controller in a ref. On each new fetch call, abort the previous one. In the `catch` block, check `if (err.name === "AbortError") return;` to silently ignore aborted requests.

**Step 7.3 — Debounce resize listener [#39]**

File: `app/concepts/responsiveness/ResponsiveDemo.tsx`

In the `useEffect` that adds the `resize` listener (lines 21-33), wrap `updateMax` in a simple debounce (e.g., 100ms `setTimeout` with cleanup). No need to install a library — a 5-line inline debounce is sufficient.

**Step 7.4 — Validate API input [#37]**

File: `app/concepts/api-calls/ApiDemo.tsx`

Add basic input validation in `handleFetch()` before constructing the URL:
```ts
if (!/^[a-z0-9-]+$/.test(trimmed)) {
  setError("Invalid input. Use letters, numbers, or hyphens.");
  setStatus("error");
  return;
}
```

**Step 7.5 — Remaining low-priority fixes**

These are optional. Tackle if time permits:

- **[#10]** Extract drag logic in `ResponsiveDemo.tsx` into a `useResizable` hook in `app/lib/useResizable.ts`.
- **[#11]** Simplify `Button.tsx` props — replace discriminated union with optional `href?: string`.
- **[#12]** Remove `status` field from `Concept` type and all concept entries in `concepts.ts` if "coming-soon" is unused. Also remove the filter in `Navbar.tsx` line 10.
- **[#18]** Add `useCallback` to `handlePresetClick` in `ResponsiveDemo.tsx`, and `toggle`/`remove` in `FrameworkDemo.tsx`.
- **[#25]** Add OpenGraph metadata to `layout.tsx` root metadata export.
- **[#27]** Refactor `ConceptNav.tsx` — accept `pathname` as a prop from a thin client wrapper to reduce client bundle. Low impact given the component's size.

**Verification:** Full pass — `npx eslint .` should show 0 errors, 0 warnings. `npx tsc --noEmit` clean. `npm run build` succeeds. Manually test all 6 concept pages, theme toggle, sidebar navigation, and all interactive demos.

---

### Phase Dependency Graph

```
Phase 1 (Foundations)
  │
  ├──→ Phase 3 (Shared UI Components) ──→ Phase 4 (Page DRY) ──→ Phase 5 (Component Refactors)
  │                                                                        │
  └──→ Phase 2 (ESLint Errors) ──────────────────────────→ Phase 6 (Next.js Compliance)
                                                                           │
                                                                    Phase 7 (Performance & Polish)
```

- Phases 1 and 2 can run **in parallel** (no shared files).
- Phase 3 depends on Phase 1 (`cn()` utility).
- Phase 4 depends on Phase 3 (`SectionLabel` component).
- Phase 5 depends on Phases 1 and 3.
- Phase 6 depends on Phase 2 (StateDemo was modified).
- Phase 7 depends on everything before it.

### Post-Refactor Checklist

After all phases are complete, verify:

- [ ] `npx eslint .` — 0 errors, 0 warnings
- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `npm run build` — succeeds
- [ ] All 6 concept pages render correctly
- [ ] Theme toggle works (light/dark/system)
- [ ] Sidebar navigation works, expand/collapse works
- [ ] All interactive demos function: responsive resize, component x-ray, state inspector, API fetch, framework todo list, accessibility toggles
- [ ] Keyboard navigation works on concept cards
- [ ] 404 page renders for unknown routes
- [ ] No visual regressions

---

*Report generated on 2026-07-10. Based on static analysis and manual code review of all 28 source files.*
