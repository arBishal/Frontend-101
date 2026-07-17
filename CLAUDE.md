# frontend-101

Interactive, visual explanations of core frontend concepts for beginners.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · deployed on Vercel.

## Commands

- `npm run dev` / `npm run lint` / `npm run build`
- Next 16 removed linting from `next build` — run lint separately before calling work done.

## Architecture

- `@/*` maps to the project root.
- `app/lib/concepts.ts` is the single registry: sidebar, homepage cards, and prev/next nav all derive from it. Register concepts there; never wire navigation manually.
- A concept = server `app/concepts/<slug>/page.tsx` + client `<Name>Demo.tsx`. Shared primitives live in `app/components/ui/` — reuse before inventing.
- Next 16 has breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before using an unfamiliar API; don't trust memory.

## Style

- Tailwind utilities at default scale only — no arbitrary `[...]` values, no inline styles.
- Zinc palette; every color has a `dark:` variant. Match the aesthetics of existing pages before introducing anything new.
- Every demo must work keyboard-only, in dark mode, and on mobile. This site teaches accessibility; it cannot fail its own lesson.

## Workflow

- Concept pages (build or refactor): follow `docs/IMPLEMENT.md` (mechanics) with `docs/WRITING.md` (prose and pedagogy).
- Plan → confirm → implement. Present the approach and wait for confirmation before writing code. Ambiguous instructions: ask, never assume.
- Smallest change that works. No speculative abstractions; no drive-by refactors — out-of-scope findings go to `docs/TODO.md`.
- Never commit unless asked. One concern per commit.
