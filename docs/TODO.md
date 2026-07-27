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

- [ ] Add a "last updated" date to concept pages
- [ ] Add "Try it yourself" challenges (2-3 per concept) to each concept page
- [ ] Add external resources for each concept
- [ ] Per-concept OG images — shared helper (title/description/icon → `ImageResponse`) + one `opengraph-image.tsx` per route folder; frameworks' 3 pages (overview, see-the-diff, landscape) all reuse the parent concept's content
- [ ] i18n (long-term) — translate concept pages once the template-first architecture stabilizes; content breadth comes first, not now
- [ ] ⌘K search / command palette — static client-side index over `concepts.ts`, no service needed; also improves keyboard-navigation story
- [ ] `CONTRIBUTING.md` + concept template — publish the page formula + a concept plan doc as a template, since concepts are the rare open-source contribution non-experts can make well
- [ ] Guard against the SWC entity/space-strip bug: render-grep the built pages for `</(strong|em|b|i|code|a)>[A-Za-z]` (an inline close tag glued to a word = a swallowed space) as a postbuild/CI check. See the typographic-characters rule in WRITING.md.
