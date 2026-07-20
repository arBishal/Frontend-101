# CTO Review — Improvement Roadmap

> Snapshot date: 2026-07-17 · Branch: `development`

---

## 1. Where we stand

**The good.** The product has a clear identity — interactive, visual explanations of frontend fundamentals for beginners — and a consistent, well-executed page formula (What is it → Why it matters → Interactive demo → How it works). Seven concepts are live (The DOM, Responsiveness, Components, State, API Calls, Frameworks ×3 pages, Accessibility). The design system is coherent (zinc palette, dark mode, shared `ui/` primitives), pages ship per-page metadata, sitemap and robots exist, and the planning discipline (per-concept plan docs, like the one used for The DOM) is genuinely good.

**The gaps, in one paragraph.** Content velocity is the bottleneck (10 planned concepts untouched); Vercel's build is the only automated check — lint no longer runs anywhere (Next 16 removed it from `next build`) and there are no tests (analytics is a deliberate non-goal for now — see §6); syntax highlighting runs client-side by necessity but no longer ships the entire Shiki engine (fixed — §3.2); concept pages now share extracted header/card pieces (fixed — §3.3); and the site has no learner-retention features (search, progress, challenges) or contribution story despite being open source.

---

## 2. Priorities at a glance

| Priority | Theme | Items |
|---|---|---|
| **P0** | Trust & foundations | Close CI gaps beyond Vercel, ~~Shiki server-side~~ (done → fine-grained bundle, §3.2), ~~shared page pieces~~ (done, §3.3), fix small inconsistencies |
| **P1** | Content velocity | Next 3 concepts (Rendering, Events, Async/Event Loop), concept cross-linking, "Try it yourself" challenges |
| **P2** | Learner experience | Search/⌘K, progress tracking, per-concept OG images |
| **P3** | Growth & community | Contribution guide + concept template, `npx frontend-101` CLI, component-breakdown series |

---

## 3. Engineering health (P0)

These protect everything else we build. All are small.

### 3.1 Close the CI gaps (Vercel covers most of it)
Vercel already acts as CI: every push builds, PRs get preview deploys, and `next build` runs the TypeScript check. Two things it does *not* cover:
- **Lint runs nowhere.** Next 16 removed linting from `next build` (see `next/dist/docs` CLI reference), so `npm run lint` is manual-only today.
- **Tests**, once they exist — Vercel won't run them.

Plan:
- Now: enable branch protection so a failing Vercel build blocks merge into `main`. Zero setup cost.
- Defer GitHub Actions until we add tests (Playwright smoke test: every concept page renders, demo mounts; axe accessibility check — a site that *teaches* accessibility should prove its own). When that workflow lands, fold `eslint` into it. Add a lint-only workflow earlier only if unlinted merges start hurting.

### 3.3 Extract shared page pieces (composition, not a rigid template) — done (2026-07-19)
The nine concept `page.tsx` files hand-copied the same title block and problem-card grid. Extracted the repeated *pieces*, not the page *structure*:
- **`ConceptHeader`** (title + subtitle props) — now in all 9 pages; the ~8-line title block collapses to a 4-line tag.
- **`ProblemCards`** (problems array + optional grid override) — now in the 7 pages with cards; the ~15-line card grid collapses to one line. Frameworks passes `className="sm:grid-cols-2 gap-4"`; no page imports `Card` directly anymore.
- **Skipped `Section`** — the section wrappers legitimately vary (prose vs demo, margins, `text-sm` prefixes), so a wrapper would need enough escape hatches to become the over-abstraction this item warns against.
- Explicitly **not** a config-driven `ConceptPageLayout` — pages keep composing pieces in plain JSX, so a divergent page just writes custom markup between them.

Build / TypeScript / lint clean.

**Single source (done 2026-07-20).** `concepts.ts` now exports `getConcept(slug)` and `conceptMetadata(slug)`; the 7 registry-backed pages derive both their `metadata` and `<ConceptHeader>` from the registry, so title/description can't drift across the three former copies. This fixed a live Responsiveness inconsistency (title was "Responsive Design" in metadata vs "Responsiveness" everywhere else; three different descriptions) — now all sourced from the registry. Sub-pages (See the Difference, Landscape) aren't registry entries, so they keep their own explicit metadata. Also normalized the prose-section wrappers (all three now share the "How it works" class) and the "Interactive demo" label margin (all `mb-4`).

---

## 4. Content: new concepts (P1)

`TODO.md`'s Concepts list has the right backlog. Recommended ordering for the next wave, chosen for beginner impact and demo-ability:

1. **Rendering** (already planned) — natural sequel to The DOM. Demo: a visual parse → style → layout → paint pipeline where toggling a CSS property shows which stages re-run.
2. **Events & Propagation** — *missing from the backlog; add it.* Bubbling, capturing, delegation. Huge beginner pain point and perfectly demo-able: click a nested box, watch the event travel the tree (reuses the DOM-tree visual language from `DomDemo`).
3. **Async JS & the Event Loop** — *missing from the backlog; add it.* Call stack / task queue / microtasks visualizer. Arguably the most-asked frontend interview topic; pairs naturally with the existing API Calls page.
4. **Routing** (planned) — demo: fake SPA with a URL bar showing history entries vs. full reloads.
5. **Caching** (planned) — pairs with API Calls; demo staleness and invalidation.

Also worth adding to the backlog (later waves): **The Cascade & Specificity** (CSS's most misunderstood feature; specificity-calculator demo), **Browser Storage** (cookies vs localStorage vs IndexedDB), **Forms & Validation**, and **Web Security Basics** (XSS/CSRF conceptually — fits the "concepts, not code" brand).

Deliberately out of scope (YAGNI, or better served elsewhere): tooling deep-dives per bundler, framework-specific tutorials, backend topics beyond what API Calls/Auth need.

---

## 5. Improving existing concepts (P1–P2)

- **Cross-linking.** `ConceptNav` already provides *sequential* prev/next links on every page. What's missing is *semantic* linking: inline links in prose wherever one concept mentions another (State's intro already talks about the DOM, unlinked). Do the inline links now — they're free while writing.
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

- **Contribution story.** The repo is open source with an issues CTA on the homepage, but there's no `CONTRIBUTING.md` and no concept template. Publish the page formula + a concept plan doc as a template; concepts are the rare open-source contribution that non-experts can make well.
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
