# Plan: Implement "The DOM" Concept Page

## Context

The DOM is the first topic from the planned concepts list (`docs/CONCEPTS.md`). It teaches how browsers represent HTML as a live, in-memory tree that JavaScript can read and modify. This is foundational — every framework ultimately manipulates the DOM.

## Files to Create/Modify

| File | Action |
|---|---|
| `app/concepts/the-dom/DomDemo.tsx` | **Create** — client component with interactive tree demo |
| `app/concepts/the-dom/page.tsx` | **Create** — server component page |
| `app/lib/concepts.ts` | **Modify** — register new concept |
| `docs/CONCEPTS.md` | **Modify** — check off "The DOM" |

## Checklist

### 1. Register the concept (`app/lib/concepts.ts`)

- [ ] Import `Network` icon from lucide-react (represents nodes/connections)
- [ ] Add entry to `concepts` array at index 0 (first item, before Responsiveness):
  ```ts
  {
    slug: "the-dom",
    title: "The DOM",
    description: "The live tree the browser builds from your HTML.",
    icon: Network,
  }
  ```

### 2. Create the page (`app/concepts/the-dom/page.tsx`)

Server component following the exact pattern from `state/page.tsx`, `components/page.tsx`.

- [ ] **Metadata**
  ```ts
  export const metadata: Metadata = {
    title: "The DOM | Frontend 101",
    description: "The live tree the browser builds from your HTML.",
  };
  ```

- [ ] **Title section** (`space-y-2`)
  - h1: "The DOM"
  - Subtitle: "The live tree the browser builds from your HTML."

- [ ] **"What is the DOM?" section** (SectionLabel + paragraphs)
  - DOM = Document Object Model, a tree-shaped in-memory representation
  - HTML is a text file; the DOM is a live data structure of objects (nodes)
  - Every element becomes a node with parent-child relationships mirroring HTML nesting
  - JavaScript reads/modifies the DOM via `document.querySelector`, `element.textContent`, `element.appendChild`
  - The DOM is what the browser actually renders, not the HTML source

- [ ] **"Why it matters" section** (SectionLabel + prose + 3 problem cards)
  - Prose: The DOM is the bridge between code and what users see. Every framework ultimately manipulates it.
  - Problem cards (`grid grid-cols-1 sm:grid-cols-3 gap-3 !mt-4`):

  | Icon | Title | Description |
  |---|---|---|
  | `FileCode` | "It's Not the HTML" | "Developers often assume the DOM is their HTML. It's actually a live object model the browser constructs, and JavaScript can change it after the page loads." |
  | `GitFork` | "Invisible Structure" | "Without understanding the tree, selecting the right element, traversing to a parent, or inserting a node feels like guesswork." |
  | `RefreshCw` | "Performance Blind Spots" | "Every DOM mutation can trigger layout recalculation and repaint. Not knowing how the tree works leads to janky, slow UIs." |

- [ ] **"Interactive demo" section** (SectionLabel + description + DomDemo)
  - Brief intro text explaining what the demo does

- [ ] **"How it works" section** (SectionLabel + paragraphs + bullet list)
  - The demo shows HTML rendered as a visual tree
  - Clicking a node shows its properties in the inspector
  - Adding/removing nodes updates both the tree and the generated HTML
  - Bullet list (`ul.list-disc.list-inside.space-y-1.5.font-mono.text-xs.lg:text-sm`):
    - **tagName**: the element's HTML tag
    - **children**: how many child nodes the element contains
    - **textContent**: the text inside the element, if any
    - **parentNode**: which node is one level up in the tree

### 3. Build the interactive demo (`app/concepts/the-dom/DomDemo.tsx`)

"use client" component with interactive DOM tree explorer.

- [ ] **Data model**
  ```ts
  type DomNode = {
    id: string;
    tag: string;
    text?: string;
    children: DomNode[];
  };
  ```

- [ ] **Initial tree** (6-7 nodes, modest depth to avoid mobile overflow)
  ```
  html
    body
      h1 "Hello!"
      div
        p "First paragraph"
        span "Styled text"
  ```

- [ ] **State**
  - `tree` (DomNode) — the current tree
  - `selectedId` (string | null) — currently selected node
  - `newTag` (string) — input for adding a child

- [ ] **Layout**: `flex flex-col sm:flex-row gap-4`
  - **Left — Card (flex-1)**: Visual tree rendering
  - **Right — InspectorPanel**: Node properties + add child form

- [ ] **Tree rendering** (recursive `TreeNode` component inside DomDemo)
  - Each node: clickable row with chevron (expand/collapse) + `<tag>` label + optional text preview
  - Indentation via `pl-4 border-l border-zinc-200 dark:border-zinc-800` for tree lines
  - Selected node highlighted: `bg-zinc-100 dark:bg-zinc-800`
  - Hover-visible delete button (X icon) on each node except `html` and `body`
  - Chevron icons: `ChevronRight` (collapsed) / `ChevronDown` (expanded) from lucide

- [ ] **InspectorPanel** (title: "Node Inspector")
  - No selection state: muted "Click a node to inspect it"
  - Selected state — property rows:
    - `tagName` — string in `text-emerald-600 dark:text-emerald-400`
    - `children` — count in `text-sky-600 dark:text-sky-400`
    - `textContent` — string in emerald, or `null` in `text-amber-600 dark:text-amber-400`
    - `parentNode` — parent tag in emerald
  - Separator (`border-t border-zinc-200 dark:border-zinc-800 pt-3 mt-3`)
  - "Add Child" form: Input (placeholder: "e.g. p, div, span") + Button (outline, Plus icon)

- [ ] **CodeBlock below** (full width, below the flex row)
  - Title: "Generated HTML"
  - `lang="html"`
  - Recursively generate indented HTML string from tree state
  - Updates live on add/remove

- [ ] **Helper functions** (pure, inside the file)
  - `findNode(tree, id)` — recursive lookup
  - `findParent(tree, id)` — find parent of a node
  - `removeNode(tree, id)` — immutable removal (returns new tree)
  - `addChild(tree, parentId, child)` — immutable insertion (returns new tree)
  - `treeToHtml(node, indent)` — generate formatted HTML string

- [ ] **ID generation**: `useRef` counter starting at 7 (initial tree uses 1-6)

- [ ] **Accessibility**
  - Tree container: `role="tree"`
  - Nodes: `role="treeitem"`, `aria-selected`, `aria-expanded`
  - Delete buttons: `aria-label="Remove <tag> node"`
  - Input: `aria-label="Tag name"`

- [ ] **Mobile responsiveness**
  - Stacks vertically on mobile (Card above, InspectorPanel below)
  - Tree indentation capped visually (overflow-x-auto on tree container)
  - CodeBlock full width at all sizes

### 4. Update docs (`docs/CONCEPTS.md`)

- [ ] Check off "The DOM" from the planned concepts list

## Verification

1. Run `npm run dev` and navigate to `/concepts/the-dom`
2. Verify the page renders with all sections (title, what, why, demo, how it works)
3. Verify the sidebar shows "The DOM" with the icon
4. Test the demo:
   - Click nodes in the tree — inspector updates with properties
   - Add a child to a selected node — tree and HTML CodeBlock update
   - Remove a node — tree and HTML update, selection clears if removed node was selected
   - Verify expand/collapse chevrons work
5. Test dark mode toggle — all elements theme correctly
6. Test mobile viewport — layout stacks, tree doesn't overflow
7. Test keyboard: Tab through tree nodes, Enter to select
8. Verify prev/next navigation (ConceptNav) works correctly
9. Run `npm run build` to catch type errors
