# Project Handoff: Frontend Concepts Explainer

## Context

This started as a demo app for one internal session ("Frontend 101: Connecting the Dots") but is now meant to be a **standing, reusable resource** — an interactive site that helps any fresh graduate joining the team understand core frontend concepts, not just attendees of one talk. It should work equally well in two modes: **presented live** by someone walking through it, and **browsed solo** afterward by a new hire on their own.

It's also meant to **grow over time** — more concepts should be addable later without restructuring the whole site. The architecture is built around that from the start: each concept is a self-contained page, and the home page automatically lists whatever concepts exist.

**Tech stack: Next.js (App Router) + React + TypeScript + Tailwind CSS.**

## Goals

- A real home page for the resource itself (not a fake product prop) that lists all concepts and links out to each.
- Each concept lives on its own page, is self-contained, and is understandable without a presenter narrating it.
- Adding a new concept in the future should mean "add one data entry + one page," not reworking existing pages.
- Every interaction has an honest, visible status — no silent state changes.
- Works reliably both live (presented) and standalone (self-browsed later).
- Visually should NOT look like a generic AI-template page — see Design Direction.

## Out of Scope

- No login, backend, database, or persistence — everything resets on page reload/navigation, which is fine.
- No CMS — concepts are defined in a simple local data file (`lib/concepts.ts`), not a database.
- No testing suite required for this — it's a teaching tool, not production software.

## Tech Stack

- **Framework:** Next.js, App Router (`app/` directory)
- **Language:** TypeScript
- **Styling:** Tailwind CSS utility classes — zinc color palette throughout, emerald accent for the progress bar. Never use hardcoded `white`/`black` — use `zinc-50`/`zinc-950` instead.
- **Key dependencies:**
  - `lucide-react` — icons (sidebar, navbar, concept cards, demos)
  - `shiki` — syntax highlighting in `CodeBlock` (`github-dark` theme, `bg-zinc-900`)
  - `simple-icons` — framework logos on the landscape page (`siReact`, `siVuedotjs`, etc.)

## Project Structure

```
app/
  layout.tsx                            → Root layout (ThemeProvider wraps everything)
  page.tsx                              → Home page (concept grid)
  globals.css                           → Tailwind imports + base styles
  lib/
    concepts.ts                         → Single source of truth for all concepts
  components/
    Navbar.tsx                          → Progress bar, dark/light toggle, share button
    Footer.tsx                          → Simple site footer
    ConceptSidebar.tsx                  → Sidebar nav with expandable children
    ConceptNav.tsx                      → Prev/Next concept navigation at page bottom
    ConceptCard.tsx                     → Home page concept card
    ThemeProvider.tsx                   → Global dark/light theme context
    ui/
      Button.tsx                        → Reusable button (solid/outline/ghost variants)
      Input.tsx                         → Reusable text input
      CodeBlock.tsx                     → Shiki code block with tabs, line numbers
  concepts/
    responsiveness/
      page.tsx
      ResponsiveDemo.tsx                → Resizable preview with device presets + drag handle
    components/
      page.tsx
      ComponentsDemo.tsx                → X-ray mode demo
    state/
      page.tsx
      StateDemo.tsx                     → Social profile card + state inspector panel
    api-calls/
      page.tsx
      ApiDemo.tsx                       → PokeAPI fetch with loading/error states
    frameworks/
      page.tsx                          → Overview: what frameworks are + problems they solve
      see-the-diff/
        page.tsx
        FrameworkDemo.tsx               → Todo demo: Vanilla JS vs React, side-by-side code
      landscape/
        page.tsx                        → Framework cards with real logos (simple-icons)
    accessibility/
      page.tsx
      AccessibilityDemo.tsx             → Keyboard focus visualizer + alt text comparison
```

## Concepts Data Model

Single source of truth in `app/lib/concepts.ts`. Drives the home page, sidebar, navbar progress bar, and prev/next navigation.

```ts
export type ConceptChild = {
  slug: string;  // full path slug, e.g. "frameworks/see-the-diff"
  title: string;
};

export type Concept = {
  slug: string;
  title: string;
  description: string;
  status: "available" | "coming-soon";
  icon: LucideIcon;
  children?: ConceptChild[];  // enables expandable sub-routes in sidebar
};

export const concepts: Concept[] = [
  { slug: "responsiveness", title: "Responsive Design", ... },
  { slug: "components",     title: "Components", ... },
  { slug: "state",          title: "State", ... },
  { slug: "api-calls",      title: "API Calls", ... },
  {
    slug: "frameworks",
    title: "Frameworks",
    children: [
      { slug: "frameworks",             title: "Overview" },
      { slug: "frameworks/see-the-diff", title: "See the Difference" },
      { slug: "frameworks/landscape",   title: "Landscape" },
    ],
  },
  { slug: "accessibility",  title: "Accessibility", ... },
];
```

**To add a new concept:** add one entry here, create `app/concepts/{slug}/page.tsx`. Home page, sidebar, and progress bar update automatically. For concepts with sub-routes, add a `children` array — the sidebar handles expansion automatically.

## Shared Components

### Navbar (`app/components/Navbar.tsx`)
- Site logo linking to home
- GitHub link
- Share button (copy URL to clipboard, shown only on concept pages)
- Dark/light theme toggle (global, persists via `ThemeProvider`)
- **Progress bar** — thin emerald bar at the bottom of the navbar; advances one step per concept visited. Calculated from the top-level concept slug only (sub-routes count as the parent concept).

### ConceptSidebar (`app/components/ConceptSidebar.tsx`)
- Lists all concepts with their icons
- Concepts with `children` show a chevron toggle
- **Collapsed + hasChildren:** clicking the row expands it (does not navigate); chevron button also toggles
- **Expanded + hasChildren:** clicking the row navigates to the parent page; children shown below
- Auto-expands when navigating to a sub-route (via `useEffect` on `pathname`)
- Active child: full bg + text highlight. Active parent (no children): same. Parent with children active: text highlight only, never bg.

### ConceptNav (`app/components/ConceptNav.tsx`)
- Prev/Next links at the bottom of every concept page
- Uses `startsWith` to match sub-routes to their parent concept slot in the sequence

### CodeBlock (`app/components/ui/CodeBlock.tsx`)
- Client component using `shiki`'s `codeToHtml` in `useEffect`
- `bg-zinc-900`, `border border-zinc-800`, `github-dark` theme
- Line numbers in a separate column (`text-zinc-600 select-none`)
- **Single mode:** `code`, `lang`, optional `title`
- **Tabbed mode:** `tabs: [{label, code, lang}]`, tabs are `flex-1` (50/50 width for two tabs), `onTabChange` callback
- Accepts `className` for border-radius/border overrides (used for side-by-side layout: `rounded-r-none border-r-0` + `rounded-l-none`)

## Concept Pages

### Responsive Design (`/concepts/responsiveness`)
Interactive resizable preview with:
- **Device preset buttons** — Mobile (< 640px), Tablet (640–1023px), Desktop (1024px+). Desktop expands to full container width.
- **Live px counter** — labeled "Viewport width", monospace, `tabular-nums`
- **Drag handle** — pill (`h-12 w-1.5`) at the preview's right edge, `w-4` hit area. Uses document-level `pointermove`/`pointerup` on `pointerdown` to avoid flicker during resize.
- **Preview content** — mock navbar, hero, card grid, footer; all respond to the preview width using inline `style` (not actual Tailwind breakpoints, since those depend on the real viewport).
- Active device derived from width ranges, not exact preset values.
- Defaults to Desktop on load.

### Components (`/concepts/components`)
Self-contained sample layout (navbar, hero, 3 feature cards, footer) with an **X-ray mode toggle** that shows dashed outlines and floating section labels (`NAVBAR`, `HERO`, `CARD`, `FOOTER`) in monospace.

### State (`/concepts/state`)
**Social profile card** with three pieces of state:
- `name` (string) — editable via text input, defaults to `"Batman"`
- `following` (boolean) — Follow/Following toggle button
- `likes` (number) — Like counter, heart fills red when > 0

**State Inspector panel** — dark monospace box alongside the card showing live values with type-color coding:
- `string` → emerald
- `boolean` → amber
- `number` → sky

Avatar uses DiceBear (`https://api.dicebear.com/9.x/avataaars/svg?seed=...`) with a random seed generated in `useEffect` (hydration-safe).

### API Calls (`/concepts/api-calls`)
PokeAPI fetch (`GET https://pokeapi.co/api/v2/pokemon/{id}`, random 1–151). Idle → Loading → Done/Error sequence with artificial 1.5s minimum delay so the loading state is always visible. Status line updates at each stage; result shows sprite, name, type(s).

### Frameworks (`/concepts/frameworks`) — 3 sub-pages

**Overview** (`/concepts/frameworks`)
- "What is a framework?" explanation
- 4 problem cards with lucide icons: DOM Manipulation, State ↔ UI Sync, Component Reuse, Routing & Structure
- Closing cue linking to See the Difference

**See the Difference** (`/concepts/frameworks/see-the-diff`)
- Interactive todo list (add, toggle complete, delete) — the live demo
- Below the demo: side-by-side `CodeBlock` on `lg+` (Vanilla JS left, React right, sharing a border), tabbed `CodeBlock` below `lg`
- Vanilla JS code shows full imperative DOM manipulation + HTML markup
- React code shows `useState`-backed declarative equivalent
- Closing cue linking to Landscape

**Landscape** (`/concepts/frameworks/landscape`)
- 6 framework cards: React, Next.js, Vue, Nuxt.js, Angular, Svelte
- Real logos from `simple-icons` rendered as inline SVGs with `fill: #hex`
- Angular: `colorOverride: "#DD0031"` (official red; `siAngular.hex` is near-black in current simple-icons)
- Next.js: `darkInvert: true` (applies `dark:invert` so black logo is visible in dark mode)
- Each card links to the framework's official site, hover reveals `ExternalLink` icon
- "Used by" tags in monospace pill chips
- Footnote: React is technically a UI library, not a framework

### Accessibility (`/concepts/accessibility`)
- Keyboard focus visualizer with live "screen reader would say" caption
- Alt text side-by-side comparison with simulate toggle

## Design Notes

- **Color palette:** zinc throughout (zinc-50 to zinc-950). Emerald for the progress bar and done/success states. No `white`/`black`.
- **Monospace accents:** section labels, state inspector, code, px counter — reinforces "these are real values."
- **Dark mode:** global, toggled in Navbar, provided by `ThemeProvider` context via `next-themes` or equivalent.
- **Typography scale:** `text-sm`/`text-base` for body, `text-2xl`/`text-3xl` for page titles, `font-mono uppercase tracking-wide` for section subheadings at `text-zinc-300`.

## Reliability Notes

- **Build ahead of time.** Run `npm run build` before presenting, then `npm run start`. Dev mode's hot-reload overlay and error screens shouldn't be visible live.
- The PokeAPI fetch is the only part requiring live internet — make sure its error state is solid.
- Every concept page is self-explanatory by reading and clicking — no assumed narration.
- No console errors on load.

## Adding a New Concept

1. Add one entry to `app/lib/concepts.ts` (slug, title, description, status, icon)
2. Create `app/concepts/{slug}/page.tsx`
3. If the concept has sub-routes, add a `children` array to the entry — the sidebar expands automatically
4. No changes needed to Navbar, ConceptSidebar, ConceptNav, or the home page
