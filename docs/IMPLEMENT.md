# Implementing a Concept — Claude's Runbook

> **Audience: Claude.** Follow this top to bottom when asked to implement (or refactor) a concept. This is the execution side of the three-pass workflow in [WRITING.md](./WRITING.md) — that doc owns the prose and pedagogy rules; this one owns the mechanics. Where they overlap, WRITING.md wins.

---

## 0. Read first

1. [WRITING.md](./WRITING.md) — the full playbook. You are executing **Pass 1** (or **Pass 3** if revising after human review).
2. WRITING.md's voice rules and §7 of this doc (the AI-prose fingerprints). You are the author these rules were written to correct; apply them to your own output, not just inherited text.
3. The two most recently shipped concept pages — for opening-type rotation (WRITING Step 2) and to match established aesthetics.

## 1. Plan before code

Create `docs/plans/PLAN-<slug>.md` **before writing any prose or code**, containing:

- The five Step 0 answers (WRITING.md Pass 1, Step 0): takeaway, misconception, scene, assumed knowledge, demo verb.
- Chosen opening type, and which types the previous two concepts used.
- Single-page or multi-page (WRITING.md "Multi-page concepts"); if multi-page, which page owns What/Why and which owns the demo.
- Demo design: what the learner does, how it can be broken, the 2–3 break-it challenges.
- Files to create/modify (see §2) and any deviation from the skeleton, with the reason.

Present the plan and **wait for confirmation before implementing** (per project CLAUDE.md). Finished plans stay in `docs/plans/` — never delete them.

## 2. Files and registration

| File | Action |
|---|---|
| `app/concepts/<slug>/page.tsx` | Create — server component, follows the section skeleton in WRITING.md |
| `app/concepts/<slug>/<Name>Demo.tsx` | Create — `"use client"` interactive demo |
| `app/lib/concepts.ts` | Add entry: `slug`, `title`, `description`, lucide `icon`; `children` array only for multi-page concepts (see the `frameworks` entry) |
| `docs/TODO.md` | Check the concept off under "Concepts" |
| `docs/plans/PLAN-<slug>.md` | Created in §1; update if the build diverges |

Sidebar, homepage cards, and prev/next nav all derive from `concepts.ts` — no manual wiring. Insert the entry at the position matching the intended learning order.

## 3. Page conventions

- **Metadata**: `title: "<Title> | Frontend 101"`, `description` = the same one-liner used in `concepts.ts` and the page subtitle (one line, three uses, identical — WRITING Step 1).
- **Structure**: root `div.flex.flex-col.gap-8.text-sm.lg:text-base`; title block, then sections per the WRITING.md skeleton. Use `SectionLabel` for section headers.
- **Shared UI** (`app/components/ui/`): `Card` for problem cards, `InspectorPanel` for demo inspectors, `CodeBlock` (with `lang`) for code, `Input`, `Button`. Reuse before inventing; a new primitive needs a reason in the plan doc.
- **Styling**: Tailwind utilities only, default scale values (no arbitrary `[...]` values — project rule). Zinc palette with `dark:` variants on everything, matching existing pages. Prose colors: body `text-zinc-600 dark:text-zinc-400`, emphasis `text-zinc-700 dark:text-zinc-300`, code `text-zinc-800 dark:text-zinc-200`.
- **Demo**: state-driven, immutable updates; stacks vertically on mobile; keyboard-operable with proper roles/labels (`role`, `aria-label`, `aria-selected` as applicable). The demo must be breakable (WRITING Step 5) — the learner can do the wrong thing and see the consequence.

## 4. Prose

Write all prose under WRITING.md Pass 1 (Steps 0–7) and its voice rules. Non-negotiables, restated because they are the rules most often broken by generated prose (see the fingerprints in §7.1):

- Opening is never "X is Y" — use the plan doc's chosen opening type.
- The page's definition appears once; the "How it works" section explains demo usage and debriefs, never re-defines.
- Max one "isn't X; it's Y" per page; break up triads; no grand closers.
- One scene, one analogy, one question, one takeaway line — all present, none duplicated.
- Every statistic appears exactly once.
- Jargon outside the assumed-knowledge line gets one plain clause or gets cut.

## 5. Verify

Run everything that can be checked without a browser; leave visual/interactive checks to the human (§6). Do **not** claim visual behavior was confirmed — report it as unverified and hand it off.

1. `npm run lint` and `npm run build` pass.
2. Run the **Pass 3 mechanical checklist** from WRITING.md against your own draft (duplicate-definition search, statistic count, jargon scan, voice-rule sweep, opening-paragraph grammar pass, sequence read).
3. Static self-review of the diff for the code-level guarantees in §3 — correct roles/`aria-*`, `dark:` variant on every color, default-scale utilities, mobile-stacking classes present. Confirm from the code, not from running it.

## 6. Hand off

End the task with a report for the human's Pass 2 review:

- What was built, with the plan doc linked.
- The five Step 0 answers restated (so the reviewer can check fidelity without opening the plan).
- Anything that diverged from the plan and why.
- Open questions or known weak spots — flag them yourself; don't leave them for the reviewer to discover.
- **A visual-check handoff list** — the things you couldn't verify without a browser, for the human to confirm: page renders and nav position, demo interactions and break-it paths, dark mode, mobile layout, keyboard operation.

Do **not** commit unless asked. When revising after Pass 2 feedback: apply every reviewer note or explicitly report why one was kept as-is — never silently drop a note (WRITING.md Pass 3).

## 7. Refactoring the legacy pages (teaching-audit findings, 2026-07-17)

This section preserves the instructor's audit of the eight pages shipped before the playbook existed. When refactoring one: follow WRITING.md "Refactoring an existing concept" (prose-first, keep the demo; write the Step 0 answers retroactively into a new plan doc; one page per refactor; out-of-scope discoveries go to TODO.md), start from the page's findings below, then apply §§3–6 of this runbook as normal.

### 7.1 AI-prose fingerprints (found in the live copy; never reintroduce)

- **The "isn't X; it's Y" reflex** — "isn't a bonus feature; it's the expected baseline", "aren't magic — they're", "doesn't add complexity; it removes it". Max one per page.
- **Triads every time** — "a button, a card, and a sidebar" / "phone, tablet, or desktop" / "profiles, listings, forecasts". Break the pattern: dwell on one, or list five carelessly.
- **Identical card rhythm** — every problem card is two sentences, claim then consequence, ~20 times. Vary shape and length.
- **Grand closers** — paragraphs announcing their own significance ("That's the core promise of…"). Land the point, move on.
- **Zero first person, zero scar tissue** — nothing only a burned human would write. One concrete scene per page fixes this.

### 7.2 Cross-cutting defects to hunt in every legacy page

- Definition-first opening (all eight) → switch type per WRITING Step 2.
- Debrief restates the page's own definition — API Calls has its opening sentence **verbatim twice**; Accessibility and State also re-define.
- Cards duplicate prose; stats appear twice (State's "#1 source of UI bugs"; Responsiveness's "half of web traffic" and the search-ranking claim).
- No questions, predictions, or break-it challenges anywhere.
- Undefined jargon for this audience: virtual DOM, immutable update, SSR, "a promise that resolves", layout recalculation/repaint.

### 7.3 Per-page notes (keep / fix)

| Page | Keep | Fix |
|---|---|---|
| **Accessibility** | Permanent/temporary/situational framing; tab-with-keyboard-off exercise | **First sentence is grammatically broken (no main verb) — fix immediately**; debrief re-defines |
| **API Calls** | Pokémon demo (say *why*: real API, free, no auth, fun) | Weakest prose; verbatim duplicate definition; GET/POST/PUT/DELETE list arrives before learner cares — move after demo; no analogy (restaurant order works if made to teach) |
| **The DOM** | Misconception material ("It's Not the HTML") — strongest teaching content on the site | Promote the misconception to the opening; no analogy (recipe vs. plated dish); debrief's "immutable update / virtual DOM" leap is two levels above the page — cut or soften to a Frameworks teaser |
| **Responsiveness** | Breakpoint explanation; snap + free-drag demo | Subtitle is a demo instruction, should be a definition; "SEO Penalty" card is fear-based — replace with human cost (pinch-zoom, mis-tap, give up); de-dup stats |
| **Components** | Progressive build (definition → analogy → props); Style Editor debrief | LEGO analogy is worn — extend it until it teaches (the standardized stud = the props interface) or replace; demo intro sentence duplicated in debrief |
| **State** | **The model page** — concrete intro examples, debrief that actually debriefs ("a mini React DevTools") | Only the duplicated stat and the re-defining debrief opener |
| **Frameworks — Overview** | Best prose on the site; "This entire site is built with Next.js" is the register to spread | Promote "take me to the airport" from paragraph three to the opening |
| **See the Difference** | Demo-first pacing (earned: What/Why live on Overview); "What to notice" header | Add concrete line counts (~60 lines of bookkeeping vs ~15) |
| **Landscape** | "There is no single best" honesty; React-is-a-library footnote | Philosophy strings are jargon soup ("virtual DOM, massive ecosystem") — rewrite as beginner-usable differentiators; add a "last reviewed" date (decays fastest) |

### 7.4 Refactor order (impact per hour)

1. Accessibility opening sentence (grammar bug on the a11y page — immediate)
2. API Calls (weakest prose, clearest duplication, easiest analogy win)
3. De-duplicate all debriefs (API Calls, Accessibility, State — mechanical, fast)
4. Openings pass across all pages (Frameworks just needs its airport line promoted)
5. Cards-to-vignettes, one page at a time (State first — closest to done)
6. Prediction prompts + break-it challenges (fold into IMPROVEMENTS §5 "Try it yourself" work)
7. Landscape philosophy strings (small, isolated, do whenever touched)
