# CTO Review — Improvement Roadmap

> Snapshot date: 2026-07-17 · Branch: `development`

---

## 1. Where we stand

**The good.** The product has a clear identity — interactive, visual explanations of frontend fundamentals for beginners — and a consistent, well-executed page formula (What is it → Why it matters → Interactive demo → How it works). Seven concepts are live (The DOM, Responsiveness, Components, State, API Calls, Frameworks ×3 pages, Accessibility). The design system is coherent (zinc palette, dark mode, shared `ui/` primitives), pages ship per-page metadata, sitemap and robots exist, and the planning discipline (per-concept plan docs, like the one used for The DOM) is genuinely good.

---

## 2. Priorities at a glance

| Priority | Theme | Items |
|---|---|---|
| **P0** | Trust & foundations | Close CI gaps beyond Vercel, ~~Shiki server-side~~ (done → fine-grained bundle, §3.2), ~~shared page pieces~~ (done, §3.3), fix small inconsistencies |
| **P1** | Content velocity | Next 3 concepts (Rendering, Events, Async/Event Loop), concept cross-linking, "Try it yourself" challenges |
| **P2** | Learner experience | Search/⌘K, progress tracking, per-concept OG images |
| **P3** | Growth & community | Contribution guide + concept template, component-breakdown series |

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

---

## 5. Improving existing concepts (P1–P2)

- ~~**The DOM** — add a "what the browser renders vs. your HTML source" toggle~~ (done 2026-07-20 — Source HTML vs Live DOM panels in `DomDemo`, side-by-side on desktop / tabbed on mobile).
- **Responsiveness** — mention container queries as the modern evolution; the demo's resizable viewport is the perfect place to show them.
- **API Calls** — surface loading/error/empty states explicitly in the demo; it's the part beginners skip and the natural hook for the future Error Handling page.
- **Accessibility** — add a contrast-checker or focus-order visualizer; today it's the thinnest demo (140 lines) for one of the most important topics.

---

## 6. Learner-experience features (P2)

Ordered by value-to-effort:

1. **⌘K search / command palette.** Content is small enough for a static client-side index over `concepts.ts` — no service needed. Also improves keyboard-navigation story.
2. **Progress tracking.** localStorage checkmarks per concept, shown in the sidebar and homepage cards. Gives learners a reason to return; no accounts, no backend.
3. **Per-concept OG images.** `opengraph-image.tsx` exists only at the root. Generated per-concept cards (title + icon) make shared links look intentional — cheap distribution.
4. **Deep-linkable demo state** (stretch). Encoding demo state in the URL turns every demo into a teaching tool people can share ("look what happens when…").

---

## 7. Growth & community (P3)

- **Contribution story.** The repo is open source with an issues CTA on the homepage, but there's no `CONTRIBUTING.md` and no concept template. Publish the page formula + a concept plan doc as a template; concepts are the rare open-source contribution that non-experts can make well.
- **i18n** (long-term). The audience for beginner frontend content is global; the template-first architecture (§3.3) is what would make translations feasible later. Not now — content breadth first.

---
