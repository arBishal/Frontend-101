# Portfolio Lens — Reading This Repo as a Hiring Reviewer

> Snapshot date: 2026-07-17
> A second review of frontend-101 with a different goal: the project as evidence of senior-level engineering, evaluated the way a CTO or senior technical interviewer would evaluate it. Handled separately from the product roadmap in [IMPROVEMENTS.md](./IMPROVEMENTS.md), though several items overlap. The companion learning workflow — surviving the depth probe behind these signals — lives in [OWNERSHIP.md](./OWNERSHIP.md).

---

## 1. The framing

**Clean code and a polished UI are table stakes, not senior signals.** A mid-level developer can produce both. What distinguishes senior in a portfolio review is evidence of *judgment, trade-offs, verification, and communication* — the things that can't be faked in one good weekend.

A reviewer spends about ten minutes: README → live site (they will tab through it and open devtools) → commit history → skim two or three source files. Everything below is scored against that pass.

---

## 2. What already reads as senior

- **The `docs/` folder is the strongest asset in the repo.** Per-concept plan docs (like the one written for The DOM) show planning before building; `IMPROVEMENTS.md` shows prioritization with explicit "deliberately deferred" decisions. **Keep finished plans** — archive them in `docs/plans/` instead of deleting after completion; they are the evidence this section is about. Most portfolios contain zero evidence of this kind of thinking — but right now the README doesn't point to it, so reviewers won't find it.
- **Consistency as a system.** Seven concept pages sharing one teaching formula and one design language reads as discipline, not repetition. Shared `ui/` primitives, `error.tsx`/`global-error.tsx`, per-page metadata, sitemap/robots — boring completeness gets noticed.
- **Small judgment moments in code.** The star-count fetch failing gracefully to `null`, immutable tree operations in `DomDemo`, a custom `useResizable` hook instead of pulling a dependency.
- **A disciplined AI-assisted workflow** (`CLAUDE.md`, `AGENTS.md`, plan docs). In 2026 hiring, interviewers actively probe how candidates use AI; artifacts showing a deliberate plan → build → review loop are a differentiator. Don't hide them — name the workflow in the README.

---

## 3. What's missing, ranked by how loudly its absence speaks

### 3.1 Zero tests
The first thing a reviewing CTO greps for, and its absence is close to disqualifying for "senior" regardless of everything else. The senior move is not coverage theater — it's choosing the right targets:

- Unit tests for the pure tree helpers in `DomDemo` (`findNode`, `findParent`, `removeNode`, `addChild`, `treeToHtml`) — textbook targets, zero mocking needed.
- One Playwright smoke test: every concept page renders, its demo mounts.
- An axe accessibility check (see §3.5 for why this one is non-optional for this repo).

A dozen sharp tests beat two hundred shallow ones, and the selection itself demonstrates that you know the difference.

### 3.2 No verification workflow
Direct commits to `development`, no PRs, no CI gates. Solo repos with self-reviewed PRs — real descriptions, small scoped diffs — signal "I work the way teams work." Mixed-concern commits like `feat: add expansion and improve mobile sidebar and fix: fix responsive issue for todo demo` read as exactly what they are. Going forward: one concern per commit, PRs into `main` even solo, branch protection on a failing build (see IMPROVEMENTS §3.1).

### 3.3 No "why" writing
The README says what the project is; nothing says what was *decided*. A short decision log is the cheapest senior signal available, and the decisions already exist in IMPROVEMENTS.md — they just need a public-facing form:

- Why concepts are hand-built TSX pages rather than MDX/CMS
- Why no analytics (traffic too low for signal — a data-driven *decision to not use data*)
- Why composition over a config-driven page template
- Why no code playground (concepts, not code-along)

Format: a `docs/DECISIONS.md` with 5–10 dated entries, three sentences each (context → decision → trade-off accepted). ADR-lite, no ceremony.

### 3.4 Performance claims without receipts
The highest-leverage single move available in this repo: the client-side Shiki issue (IMPROVEMENTS §3.2) is precisely the kind of thing a senior reviewer spots in the devtools network tab. Fix it, **measure before/after bundle size, and write three paragraphs about it**. A documented "found it, fixed it, measured it, here's the number" narrative converts the repo's biggest current weakness into its best interview story. Then put the Lighthouse scores in the README and keep them honest.

### 3.5 The accessibility bar is higher for this repo
The site *teaches* accessibility, so a reviewer will tab through it specifically looking for hypocrisy. The walk-the-talk checklist:

- Visible focus states everywhere, logical tab order
- Skip-to-content link
- `prefers-reduced-motion` respected by the hero animations
- Demos operable by keyboard alone (the DOM tree already has `role="tree"` plumbing — finish the job)
- All pages axe-clean, enforced in CI (§3.1)

Being exemplary here is on-brand and genuinely rare.

### 3.6 README as a landing page
Reviewers decide in ninety seconds whether to keep reading. The README needs: live-site link at the very top, a GIF of a demo in action, a short architecture note (rendering strategy, why the stack), Lighthouse scores, and links into `docs/` so the planning work is discoverable. Also currently stale — it doesn't list The DOM.

---

## 4. What would actively hurt

Anti-signals to keep resisting:

- **Résumé-driven tech.** Adding a state library, a backend, or infra this static educational site doesn't need reads as chasing keywords, not solving problems.
- **Coverage theater.** 100% coverage on trivial components signals metric-worship, the opposite of judgment.
- **Over-abstraction.** A config-driven page factory would look "architected" and be worse — the composition decision (IMPROVEMENTS §3.3) is the senior posture. The restraint documented in IMPROVEMENTS §6 *is* the signal; keep it.

---

## 5. Action list (separate track from the product roadmap)

Overlapping items stay tracked in IMPROVEMENTS.md; this list is what the portfolio lens *adds*:

- [ ] Unit tests for `DomDemo` tree helpers + Playwright smoke + axe check (overlaps IMPROVEMENTS §3.1)
- [ ] Switch to PR-based workflow with branch protection; one concern per commit
- [ ] `docs/DECISIONS.md` — ADR-lite decision log seeded from IMPROVEMENTS.md
- [ ] Shiki server-side fix **with measured before/after numbers written up** (overlaps IMPROVEMENTS §3.2)
- [ ] Accessibility walk-the-talk pass (§3.5)
- [ ] README rebuild: live link, demo GIF, architecture note, Lighthouse scores, links to `docs/`, add The DOM
- [ ] Name the AI-assisted workflow in the README (plan docs as evidence)

The thesis, in one line: past mid-level, you're not evaluated on what you can build — you're evaluated on how you decide, verify, and explain. Nearly everything above is writing and process, not features; that's the point.
