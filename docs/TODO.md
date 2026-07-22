# TODO

## Concepts

Conceptual frontend topics to implement, each with interactive demos and explanations.

- [x] **The DOM** — how browsers represent your page as a tree, and why it matters
- [ ] **Rendering** — how the browser turns code into pixels (parse, layout, paint)
- [ ] **Client vs Server** — what runs where, why the split exists, and how it's blurring
- [ ] **Routing** — how single-page apps navigate without full reloads
- [ ] **Caching** — why browsers store things, how stale data happens, cache invalidation
- [ ] **Data Flow** — how data moves through a UI: props down, events up, global state
- [ ] **Authentication** — identity on the web: sessions, tokens, protected content
- [ ] **Error Handling** — what happens when things go wrong: graceful degradation, fallback UI
- [ ] **Performance** — what makes a page feel fast or slow, and what you can control
- [ ] **Build & Bundle** — why frontend code gets transformed before it ships to the browser
- [ ] **Testing** — why and how we verify UI works: unit, integration, visual, e2e
- [ ] **Browser Storage** — cookies vs localStorage vs sessionStorage vs IndexedDB, and when to use each
- [ ] **Web Security Basics** — XSS, CSRF, and same-origin policy, explained conceptually

## Tasks

- [ ] Design and add a proper favicon
- [ ] Refactor CSS
- [ ] Revisit theme toggling
- [ ] Polish mobile ui
- [ ] Add a "last updated" date to concept pages
- [ ] Add "Try it yourself" challenges (2-3 per concept) to each concept page
- [ ] Per-concept OG images — shared helper (title/description/icon → `ImageResponse`) + one `opengraph-image.tsx` per route folder; frameworks' 3 pages (overview, see-the-diff, landscape) all reuse the parent concept's content
- [ ] i18n (long-term) — translate concept pages once the template-first architecture stabilizes; content breadth comes first, not now
- [ ] ⌘K search / command palette — static client-side index over `concepts.ts`, no service needed; also improves keyboard-navigation story
- [ ] `CONTRIBUTING.md` + concept template — publish the page formula + a concept plan doc as a template, since concepts are the rare open-source contribution non-experts can make well
- [ ] Responsive demo: the free-drag resize handle (`role="separator"` in `ResponsiveDemo.tsx`) has no keyboard handler — free resizing is pointer-only. Add arrow-key resize so keyboard users can hit widths the preset buttons don't cover.
- [ ] `ConceptSidebar.tsx:96` fails `npm run lint`: `setExpandedSlugs` is called synchronously inside an effect (`react-hooks/set-state-in-effect`). Pre-existing; blocks a clean lint run. Derive the expanded state during render or move the update into the navigation handler instead of an effect.
