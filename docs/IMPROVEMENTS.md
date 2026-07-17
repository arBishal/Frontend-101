# CTO Review — Improvement Roadmap

> Snapshot date: 2026-07-17 · Branch: `development`
> A strategic review of frontend-101: where the product stands, and prioritized improvements across content, features, and engineering. Companion docs: [CONCEPTS.md](./CONCEPTS.md) (topic backlog), [TODO.md](./TODO.md) (small tasks).

---

## 1. Where we stand

**The good.** The product has a clear identity — interactive, visual explanations of frontend fundamentals for beginners — and a consistent, well-executed page formula (What is it → Why it matters → Interactive demo → How it works). Seven concepts are live (The DOM, Responsiveness, Components, State, API Calls, Frameworks ×3 pages, Accessibility). The design system is coherent (zinc palette, dark mode, shared `ui/` primitives), pages ship per-page metadata, sitemap and robots exist, and the planning discipline (`PLAN-the-dom.md`) is genuinely good.

**The gaps, in one paragraph.** Content velocity is the bottleneck (10 planned concepts untouched); there is no CI and no tests, so nothing catches regressions (analytics is a deliberate non-goal for now — see §6); syntax highlighting runs client-side, which ships the entire Shiki engine to the browser; each concept page re-implements the same layout by hand instead of sharing a template; and the site has no learner-retention features (search, progress, challenges) or contribution story despite being open source.

---

## 2. Priorities at a glance

| Priority | Theme | Items |
|---|---|---|
| **P0** | Trust & foundations | CI pipeline, Shiki server-side, shared page template, fix small inconsistencies |
| **P1** | Content velocity | Next 3 concepts (Rendering, Events, Async/Event Loop), concept cross-linking, "Try it yourself" challenges |
| **P2** | Learner experience | Search/⌘K, progress tracking, per-concept OG images |
| **P3** | Growth & community | Contribution guide + concept template, `npx frontend-101` CLI, component-breakdown series |

---

## 3. Engineering health (P0)

These protect everything else we build. All are small.

### 3.1 Add CI
There is no `.github/` directory. Every merge to `main` is unverified.
- GitHub Actions workflow: `lint` → `tsc --noEmit` → `next build` on PRs and pushes.
- Later: add a Playwright smoke test (every concept page renders, demo mounts) and an axe accessibility check — a site that *teaches* accessibility should prove its own.

### 3.2 Move Shiki to the server
`CodeBlock.tsx` is `"use client"` and calls `codeToHtml` in an effect — the full highlighter engine and grammars ship to every visitor, and code blocks flash unstyled on load. Since all code samples are static strings, highlight at build time in a server component (or an async RSC wrapper) and keep only the copy-button as a client island. This is likely the single biggest performance win available.

### 3.3 Extract a shared concept-page template
All seven `page.tsx` files hand-copy the same structure (title block, `SectionLabel` sections, problem-card grid, demo slot). A `ConceptPageLayout` + `ProblemCards` component would:
- cut ~40% of each page's code and end the copy-paste drift between pages,
- make new concepts faster to ship (directly serves content velocity),
- let `concepts.ts` become the single source for title/description (currently duplicated in each page's `metadata`, prose, and the registry).

### 3.4 Small correctness fixes
- **README is stale** — it doesn't list The DOM.
- **Homepage CTA** ("Explore the demos") links to `/concepts/responsiveness`, but The DOM is now the first concept. Link to the first entry in `concepts.ts` instead of hardcoding.
- **`npx frontend-101` in the hero is fictional** — no such package exists. Either publish a trivial CLI that opens the site (fun, on-brand, cheap) or change the line. Shipping a fake command on an educational site undercuts trust.
- Existing TODO items stand: favicon, CSS refactor (extract repeated zinc patterns into semantic tokens via Tailwind v4 `@theme`), theme-toggle revisit, mobile polish.

---

## 4. Content: new concepts (P1)

`CONCEPTS.md` has the right backlog. Recommended ordering for the next wave, chosen for beginner impact and demo-ability:

1. **Rendering** (already planned) — natural sequel to The DOM. Demo: a visual parse → style → layout → paint pipeline where toggling a CSS property shows which stages re-run.
2. **Events & Propagation** — *missing from the backlog; add it.* Bubbling, capturing, delegation. Huge beginner pain point and perfectly demo-able: click a nested box, watch the event travel the tree (reuses the DOM-tree visual language from `DomDemo`).
3. **Async JS & the Event Loop** — *missing from the backlog; add it.* Call stack / task queue / microtasks visualizer. Arguably the most-asked frontend interview topic; pairs naturally with the existing API Calls page.
4. **Routing** (planned) — demo: fake SPA with a URL bar showing history entries vs. full reloads.
5. **Caching** (planned) — pairs with API Calls; demo staleness and invalidation.

Also worth adding to the backlog (later waves): **The Cascade & Specificity** (CSS's most misunderstood feature; specificity-calculator demo), **Browser Storage** (cookies vs localStorage vs IndexedDB), **Forms & Validation**, and **Web Security Basics** (XSS/CSRF conceptually — fits the "concepts, not code" brand).

Deliberately out of scope (YAGNI, or better served elsewhere): tooling deep-dives per bundler, framework-specific tutorials, backend topics beyond what API Calls/Auth need.

---

## 5. Improving existing concepts (P1–P2)

- **Cross-linking.** Concepts are currently islands. Add a "Related concepts" footer to the template (The DOM → Rendering, State; State → Components; API Calls → Caching). Cheap once §3.3 lands, and it's how a reference site compounds value.
- **"Try it yourself" challenges.** Each page ends passively. Add 2–3 prompts per concept ("Remove the `<div>` node — what happens to its children?"). Turns reading into doing at near-zero build cost.
- **The DOM** — add a "what the browser renders vs. your HTML source" toggle to drive home the page's own key insight.
- **Responsiveness** — mention container queries as the modern evolution; the demo's resizable viewport is the perfect place to show them.
- **API Calls** — surface loading/error/empty states explicitly in the demo; it's the part beginners skip and the natural hook for the future Error Handling page.
- **Frameworks / Landscape** — this page decays fastest. Add a "last reviewed" date and a 6-month review reminder.
- **Accessibility** — add a contrast-checker or focus-order visualizer; today it's the thinnest demo (140 lines) for one of the most important topics.

---

## 6. Learner-experience features (P2)

Ordered by value-to-effort:

1. **⌘K search / command palette.** Content is small enough for a static client-side index over `concepts.ts` — no service needed. Also improves keyboard-navigation story.
2. **Progress tracking.** localStorage checkmarks per concept, shown in the sidebar and homepage cards. Gives learners a reason to return; no accounts, no backend.
3. **Per-concept OG images.** `opengraph-image.tsx` exists only at the root. Generated per-concept cards (title + icon) make shared links look intentional — cheap distribution.
4. **Deep-linkable demo state** (stretch). Encoding demo state in the URL turns every demo into a teaching tool people can share ("look what happens when…").

Deliberately deferred: in-browser code playgrounds (Sandpack et al. — heavy dependency, and our brand is *concepts*, not code-along), user accounts, comments, and **analytics** — current traffic is too low for usage data to be signal rather than noise. Until traffic justifies revisiting that, we prioritize by editorial judgment: beginner pain (how often the topic confuses newcomers), demo-ability (does it suit our interactive format), and GitHub feedback (stars, issues, what people ask about).

---

## 7. Growth & community (P3)

- **Contribution story.** The repo is open source with an issues CTA on the homepage, but there's no `CONTRIBUTING.md` and no concept template. Publish the page formula + `PLAN-the-dom.md` as a template; concepts are the rare open-source contribution that non-experts can make well.
- **"How to Approach a Component" series.** Already teased on the homepage — either schedule it (it's a distinct content type: applied breakdowns vs. concepts, likely `app/components-lab/` or similar) or pull the teaser; a long-lived "coming soon" ages badly.
- **`npx frontend-101`** — see §3.4; as a real package it doubles as marketing.
- **i18n** (long-term). The audience for beginner frontend content is global; the template-first architecture (§3.3) is what would make translations feasible later. Not now — content breadth first.

---

## 8. Suggested sequence

| Phase | Focus | Outcome |
|---|---|---|
| 1 (now) | §3 entirely | Safe to move fast on a solid foundation |
| 2 | Rendering + Events concepts, cross-linking, challenges | Content flywheel on the shared template |
| 3 | Event Loop concept, ⌘K search, progress tracking, OG images | Retention + distribution |
| 4 | Routing/Caching concepts, contribution guide, component series | Community-assisted growth |

We are deliberately operating without analytics (§6) — decisions here rest on editorial judgment and GitHub feedback. Revisit this document at the end of each phase, and reconsider analytics only if traffic grows enough for the data to mean something.
