# Frameworks Page — Implementation Plan

## Overview

The goal is to explain what a framework is, why it's necessary, and what the current options are — with a hands-on demo that makes the "why" visceral, not theoretical.

The content is split across sub-routes under `/concepts/frameworks/`. Navigation between sub-routes happens via the sidebar — clicking "Frameworks" expands a collapsible sub-topic list with a chevron.

---

## Routing Structure

```
/concepts/frameworks                → Overview (what + why)
/concepts/frameworks/see-the-diff   → Interactive demo (vanilla vs react)
/concepts/frameworks/landscape      → Current framework landscape
```

### How it fits with existing navigation

- **ConceptSidebar** — "Frameworks" gets a chevron icon. Clicking it expands/collapses a nested list of sub-topics underneath:
  - Overview
  - See the Difference
  - Landscape
  - Clicking a sub-topic navigates to its route.
  - The parent "Frameworks" entry stays highlighted when any sub-route is active.
  - The expanded state is driven by the current pathname — if the user is on any `/concepts/frameworks/*` route, the sub-list is expanded.
- **ConceptNav** (prev/next) — Still works at the top level. The next/prev arrows navigate between concepts, not within framework sub-routes.
- **`app/lib/concepts.ts`** — The `Concept` type gets an optional `children` array for sub-topics. Only "Frameworks" uses it for now, but the pattern is reusable for future concepts that grow large.

---

## Route 1: `/concepts/frameworks` — Overview

### Section: Header

- **Title:** "Why Frameworks Exist"
- **Subtitle:** "The manual pain frameworks were built to remove."

### Section: "What is a Framework?"

Static explanatory text:

- A framework is a pre-built foundation that handles the repetitive, error-prone parts of building UIs — DOM updates, state management, routing, event handling.
- You describe *what* the UI should look like; the framework figures out *how* to update the page.
- **Analogy:** Writing HTML by hand is like giving turn-by-turn directions. A framework is like saying "take me to the airport" — it handles the route.

### Section: "What Problems Do They Solve?"

A grid of 3-4 cards, each with an icon, title, and short description:

| # | Title              | Description                                                                                          |
|---|--------------------|------------------------------------------------------------------------------------------------------|
| 1 | DOM Manipulation   | Manually creating, updating, and removing HTML elements is tedious and error-prone. Frameworks do it automatically. |
| 2 | State-UI Sync      | When data changes, the UI must update. Frameworks track this relationship so you don't have to.      |
| 3 | Component Reuse    | Build a button once, use it everywhere. Frameworks make composition natural.                         |
| 4 | Routing & Structure| Multi-page apps need navigation, layouts, data loading. Frameworks provide conventions for all of this. |

### Section: Closing text

- Frameworks aren't magic — they're JavaScript libraries with smart abstractions.
- This entire site (Frontend 101) is built with **Next.js**, which is built on **React**.
- End with a prompt: "Next, see the difference for yourself." linking to the demo sub-route.

---

## Route 2: `/concepts/frameworks/see-the-diff` — Interactive Demo

### Section: Header

- **Title:** "See the Difference"
- **Subtitle:** "The same task, two approaches."

### The task

A live search/filter — a list of 5-6 items with a text input. The user types to filter the list in real time.

This is more relatable than a counter (everyone's used a search box) and the vanilla boilerplate is uglier — making the framework advantage more visceral.

### Layout

A **single panel with a toggle** to switch between "Vanilla JS" and "React" views.

- **Toggle bar** at the top of the demo panel — two buttons: `Vanilla JS` | `React`
- Below the toggle: the **live demo** (functional in both modes)
- Below the live demo: the **code block** (plain `<pre>` with monospace styling) showing the source for the active mode

### Vanilla JS view

The mocked code shows how you have to manually:

1. `document.getElementById` to grab the input and list container
2. `addEventListener('input', ...)` on the input
3. Loop through all `<li>` elements
4. Check `textContent.includes(...)` on each
5. Toggle `style.display` on each matching/non-matching element
6. Handle empty state manually

### React view

The same thing, declaratively:

1. Declare state with `useState` for the query
2. `items.filter(i => i.includes(query)).map(...)` in JSX
3. Empty state is just a conditional render

### Key behavior

- **Both modes are live and functional** — the demo resets when toggling between modes.
- The vanilla version's code is ~3x longer and harder to follow.
- The contrast lands immediately: same result, vastly different effort.
- No actual vanilla JS execution needed — the demo is implemented in React for both modes, but the code block shows what the vanilla version *would* look like.

### Callout below the demo

> "Both do the same thing. The framework version is shorter, declarative, and automatically keeps the UI in sync with the data."

---

## Route 3: `/concepts/frameworks/landscape` — The Current Landscape

### Section: Header

- **Title:** "The Current Landscape"
- **Subtitle:** "The major frameworks and what makes each one different."

### Framework cards

A grid of cards for the major frameworks. Each card links to the framework's official docs.

| Framework | Philosophy                                                             | Notable Users             | Accent Color | Link                          |
|-----------|------------------------------------------------------------------------|---------------------------|--------------|-------------------------------|
| React     | The most widely used. Component-based, virtual DOM, massive ecosystem. | Meta, Netflix, Airbnb     | `#61DAFB`    | https://react.dev             |
| Vue       | Approachable and flexible. Great docs, gentle learning curve.          | Alibaba, GitLab           | `#42B883`    | https://vuejs.org             |
| Angular   | Full-featured, opinionated. Built-in routing, forms, HTTP.             | Google, Microsoft         | `#DD0031`    | https://angular.dev           |
| Svelte    | Compiles away the framework. No virtual DOM, minimal runtime.          | Growing fast, Vercel      | `#FF3E00`    | https://svelte.dev            |

Each card includes:
- Framework name
- One-line philosophy
- 2-3 notable users
- A subtle colored accent border matching the framework's brand
- Links to official docs (opens in new tab)

### Closing text

- The best framework is the one your team knows and your project needs. They all solve the same core problems differently.
- No single "best" — each has trade-offs in bundle size, learning curve, ecosystem, and opinion level.

---

## File Structure

```
app/concepts/frameworks/
  page.tsx                      # Route 1: Overview (what + why + problems)
  see-the-diff/
    page.tsx                    # Route 2: Interactive demo page
    FrameworkDemo.tsx           # Client component — toggled vanilla vs react
  landscape/
    page.tsx                    # Route 3: Framework landscape cards
```

---

## Changes to Existing Files

- **`app/lib/concepts.ts`**
  - Add optional `children` field to `Concept` type: `children?: { slug: string; title: string }[]`
  - Add children to the "Frameworks" entry:
    ```
    children: [
      { slug: "frameworks", title: "Overview" },
      { slug: "frameworks/see-the-diff", title: "See the Difference" },
      { slug: "frameworks/landscape", title: "Landscape" },
    ]
    ```
- **`app/components/ConceptSidebar.tsx`**
  - Add chevron icon (e.g. `ChevronDown` from lucide) next to "Frameworks".
  - When the current pathname starts with `/concepts/frameworks`, expand the sub-list automatically.
  - Render children as indented links below the parent entry.
  - Use `pathname.startsWith(href)` for parent highlight, `pathname === href` for child highlight.
- **`app/components/ConceptNav.tsx`** — May need `startsWith` adjustment so prev/next still works on sub-routes.

---

## Resolved Decisions

- [x] **Demo implementation** — No actual vanilla JS execution. The demo is implemented in React for both modes. The code block just shows what the vanilla version *would* look like.
- [x] **Code blocks** — Plain `<pre>` with monospace styling for now. Can add syntax highlighting later if needed.
- [x] **Framework cards** — Link out to official docs (new tab).
- [x] **Demo task** — Live search/filter. More relatable than a counter, uglier vanilla boilerplate.
- [x] **Sub-route navigation** — Expandable sidebar with chevron, no local sub-nav/tabs.

---

## Open Questions

- [ ] Any frameworks to add or remove from the landscape section?
- [ ] Should the chevron/expand pattern be generic (support any concept with children) or specific to frameworks for now?
