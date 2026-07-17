# Technical Audit — Claude's Runbook

> **Audience: Claude.** Follow this when asked to run the technical audit (expected cadence: monthly). This is a read-only engagement: **find and report, don't fix.** Fixes are scheduled separately from the report's priority list.

---

## 1. Ground rules

- Run on a clean working tree; note the commit hash and date in the report.
- Every finding needs: `file:line`, the evidence (what the code does), why it matters (concrete failure or cost, not doctrine), and a suggested fix with estimated effort (S/M/L).
- **Verify before reporting.** Framework claims are checked against `node_modules/next/dist/docs/` — never memory (Next 16 broke earlier conventions). A finding you can't demonstrate is not a finding.
- Noise discipline: a short list of real issues beats a long list of observations. If you wouldn't raise it in a PR review, don't put it in the report.

## 2. Mechanical checks (run first)

1. `npm run lint` — Next 16 build does not lint; this catches what CI currently doesn't.
2. `npm run build` — type errors, build warnings, route/bundle output. Record First Load JS per route and compare with the previous audit.
3. `npx tsc --noEmit` if the build's checking was skipped or configured down.
4. Scan `package.json`: unused dependencies, obviously outdated majors, anything in `dependencies` that belongs in `devDependencies`.

## 3. Audit areas

Work through each area across the whole `app/` tree. The questions are prompts, not an exhaustive list — flag anything in the area's spirit.

### 3.1 React
- `"use client"` only where interaction demands it? Any client component that could be a server component (or split so only an island is client)?
- Effects: anything computed in `useEffect` that is derived state (belongs in render)? Missing cleanup (timers, listeners, aborted fetches)? Fetch race conditions on rapid re-trigger?
- State: colocated at the lowest owner? Any prop-drilling that has crossed the threshold where composition or context is warranted (threshold, not first sight)?
- Lists keyed by stable identity, not index (where reorder/removal exists)?
- Unnecessary `memo`/`useCallback`/`useMemo` ceremony — or a genuinely hot path missing it?
- Controlled/uncontrolled input consistency; hydration hazards (`Date`, `random`, `window` in render, theme flash).

### 3.2 Next.js (verify against bundled docs)
- Server/client component boundary placed to minimize shipped JS?
- `fetch` caching/revalidate semantics correct for intent? (Cache behavior changed across Next versions — verify.)
- Metadata: every page has it; no drift between `metadata`, visible titles, and `concepts.ts`.
- Conventions used where they pay: `error.tsx` / `loading.tsx` / `not-found.tsx` coverage for new routes; `next/image` and font handling for any new media; no `<a>` where `<Link>` belongs (internal), no `<Link>` misuse (external).
- Anything imported into a server component that drags a large client-only library into the bundle.

### 3.3 TypeScript
- `any` (explicit or implicit), unnecessary non-null assertions, `as` casts that mask real type holes.
- Types describing intent: unions/literal types where strings are being passed around (`"solid" | "outline"` not `string`)?
- Exported types for shared shapes (`Concept`, demo models) vs. duplicated inline shapes drifting apart.
- Dead exports, dead types, unused props on components.

### 3.4 Design principles (SOLID / DRY / KISS / YAGNI — both directions)
- **DRY**: same markup/logic pattern hand-copied ≥3 times → flag for extraction (the concept-page template is the known case; flag *new* instances). Same constant/string duplicated where one source should exist.
- **SRP**: components doing two jobs (rendering + data shaping + formatting in one body) past the point of readability; files that have grown past ~250 lines doing unrelated things.
- **Over-engineering is a finding too**: abstractions with one caller, config-driven indirection where plain JSX would do, premature generality (YAGNI), clever code where boring code works (KISS). This codebase's stated bias is composition over configuration — flag violations in both directions.
- Public interfaces: components taking 8 props where 2 + `children` would do; boolean-prop explosions.

### 3.5 Accessibility (code-level)
- Semantic elements over div-with-handlers; heading hierarchy per page.
- Interactive demos: full keyboard operability, visible focus, correct roles/`aria-*` (and no *incorrect* aria — wrong aria is worse than none).
- Images/icons: alt or `aria-hidden`; icon-only buttons have `aria-label`.
- Motion: animations respect `prefers-reduced-motion`.
- Color: any information conveyed by color alone; contrast of new color pairs.
- This site teaches a11y — hold it to the standard it teaches.

### 3.6 Performance
- Client bundle: what does each `"use client"` component import? Any heavy dependency shipped for a small feature (the Shiki-in-client case is the archetype)?
- Re-render hygiene: state updates that re-render large trees; object/array literals recreated per render and passed to memoized children.
- Layout: anything forcing sync layout (measuring in effects without need); unsized images causing CLS.
- Compare route bundle sizes to previous audit; flag regressions >10%.

### 3.7 Styling / Tailwind
- Project rules hold: default-scale utilities only (no arbitrary `[...]` values), zinc palette, `dark:` variant on every color.
- Repeated multi-class patterns that have earned a component or `@theme` token; contradictory class combinations; dead CSS in `globals.css`.
- Same visual intent expressed with different utilities in different files (drift).

### 3.8 Security & correctness hygiene
- External links: `rel="noopener noreferrer"` with `target="_blank"`.
- Any `dangerouslySetInnerHTML` — justified and sourced from trusted input only (the Shiki HTML case: verify the source).
- No secrets/env values reaching client components; no user-controlled string interpolated into URLs/HTML without handling.
- Error handling: fetches with no failure path; error boundaries actually covering the risky subtrees.

### 3.9 Project hygiene
- Dead code: unused components, exports, assets in `public/`, stale files.
- Naming and structure consistency with the conventions in `CLAUDE.md`/`docs/IMPLEMENT.md`.
- `concepts.ts` registry vs. reality: every page registered, order sensible, one-liner consistency (registry = metadata = subtitle).
- Docs drift: does `README.md` still match the codebase? Do `docs/` claims (file names, sections referenced) still resolve?

## 4. Severity rubric

| Level | Meaning |
|---|---|
| **Critical** | User-facing breakage or data/security exposure, now |
| **High** | Real cost today: perf regression, a11y blocker, correctness bug awaiting the right input |
| **Medium** | Growing cost: drift, duplication past threshold, convention violations that compound |
| **Low** | Worth fixing when touching the file anyway |

Severity is about consequence, not principle violated. An "SRP violation" with no reader confusion and no change-friction is Low or not a finding.

## 5. Report

Write to `docs/audits/AUDIT-<YYYY-MM>.md`:

1. **Header** — date, commit, scope (what was and wasn't examined).
2. **Verdict** — three sentences: overall health, trajectory vs. last audit, the one thing to fix first.
3. **Regression check** — findings from the previous audit: fixed / still open / worse. New regressions in previously clean areas.
4. **Findings** — grouped by severity, each with file:line, evidence, impact, suggested fix, effort (S/M/L).
5. **Known / accepted** — deferred items confirmed still deliberate (one line each, with doc reference).
6. **Fix plan** — priority-ordered list sized for the month, ready to be executed as separate tasks under the normal workflow (plan → confirm → PR).
7. **Watchlist** — not findings yet; check again next audit.

The report is append-only history: never edit past audit files; each month gets a new one. Trend honesty matters more than a clean-looking report — if the codebase got worse, the verdict says so plainly.
