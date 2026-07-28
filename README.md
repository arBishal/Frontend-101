# Frontend 101

Interactive, visual explanations of core frontend concepts for new developers.

**🔗 Live site — [frontend101.vercel.app](https://frontend101.vercel.app)**


## What is this?

Frontend 101 is an educational site that teaches fundamental frontend development concepts through interactive demos and clear explanations. Each concept page follows the same shape — **what it is → why it matters → an interactive demo → how it works** — so a beginner can build a mental model, then poke at it directly.

## Concepts covered

| Concept | In one line |
| --- | --- |
| **The DOM** | The live tree the browser builds from your HTML |
| **Responsiveness** | Making layouts adapt to any screen size |
| **Components** | Why we build UIs out of reusable pieces |
| **State** | How apps remember things that change |
| **API Calls** | How the frontend asks a server for data |
| **Frameworks** | A pre-built foundation that handles the repetitive parts of building an app |
| **Accessibility** | Making sure the UI works for everyone |

## Architecture

- **Server-first, static by default.** Concept pages are React Server Components and are prerendered to static HTML at build time. The interactive demos are the only client code — each is a `"use client"` island (`DomDemo`, `ResponsiveDemo`, etc.) hydrated on its own, so the shipped JavaScript stays small.
- **One source of truth.** `app/lib/concepts.ts` is a single registry that drives the homepage cards, the concept sidebar, prev/next navigation, and the generated sitemap. Adding a concept there wires it everywhere.
- **Design system in utilities.** Tailwind CSS v4 with a zinc palette and class-based dark mode (a tiny inline script sets the theme before paint to avoid a flash). Shared primitives live in `app/components/ui/` and are reused rather than re-styled per page.
- **Syntax highlighting** via [Shiki](https://shiki.style/) with paired light/dark themes.
- **SEO/discovery.** Per-page metadata, a generated `sitemap.xml` and `robots.txt`, and an Open Graph image.
- **Analytics** via [Vercel Analytics](https://vercel.com/analytics), wired into the root layout.

**Why this stack:** the App Router + Server Components give static-first performance without giving up interactivity; Tailwind provides a consistent design language without pulling in a component library; TypeScript is used throughout.

### Performance

Static generation plus server components keep the shipped JavaScript small — most routes are prerendered HTML with demos hydrated as isolated islands.

**Lighthouse** (mobile, 2026‑07‑18) — Performance **92** · Accessibility **96** · Best Practices **100** · SEO **100**.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Shiki](https://shiki.style/) for syntax highlighting
- [Lucide](https://lucide.dev/) for icons
- [Simple Icons](https://simpleicons.org/) for brand/framework logos
- [Prettier](https://prettier.io/) (with `prettier-plugin-tailwindcss`) for formatting

## How this project is built

This repo is planned and documented in the open — the `docs/` folder is part of the work, not an afterthought. The workflow is deliberate: plan a change, build it, review it.

- [`docs/BACKLOG.md`](./docs/BACKLOG.md) — concept backlog and smaller tasks
- [`docs/WRITING.md`](./docs/WRITING.md) — the playbook for writing and reviewing a concept page
- [`docs/IMPLEMENT.md`](./docs/IMPLEMENT.md) — the technical runbook for building a concept
- [`docs/AUDIT_PLAN.md`](./docs/AUDIT_PLAN.md) — the monthly technical-audit runbook
- [`docs/improvements/`](./docs/improvements/) — dated write-ups for specific improvements

Development is AI-assisted with a plan → build → review loop; the conventions that guide it live in [`CLAUDE.md`](./CLAUDE.md).

## Getting started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`    | Start development server |
| `npm run build`  | Production build         |
| `npm start`      | Serve production build   |
| `npm run lint`   | Run ESLint + Prettier check (not part of `next build` in Next 16 — run it separately) |
| `npm run format` | Format all files with Prettier |

## Project structure

```
app/
  layout.tsx                  # Root layout + theme provider + analytics
  page.tsx                    # Landing page
  BrowserMockup.tsx           # Decorative hero visual (landing page)
  globals.css                 # Global styles, Tailwind theme, keyframes
  sitemap.ts / robots.ts      # Generated SEO routes
  opengraph-image.tsx         # Social share image
  error.tsx / global-error.tsx / not-found.tsx  # Error and 404 boundaries
  components/
    ui/                       # Reusable primitives (Button, Card, CodeBlock, ...)
    ThemeProvider.tsx         # Dark/light theme state (localStorage + system)
    ThemeToggleButton.tsx     # Reusable sun/moon toggle button
    ThemeToggleFloat.tsx      # Floating scroll-aware theme toggle
    Navbar.tsx / Footer.tsx   # Chrome
    ConceptSidebar.tsx        # Concept page sidebar
    ConceptNav.tsx            # Prev/next concept navigation
    ConceptHeader.tsx         # Concept page title + subtitle
    ProblemCards.tsx          # "Why it matters" problem-card grid
  concepts/
    the-dom/                  # The DOM concept + demo
    responsiveness/           # Responsive design concept + demo
    components/               # Components concept + demo
    state/                    # State concept + demo
    api-calls/                # API calls concept + demo
    frameworks/               # Frameworks overview, landscape, and diff demo
    accessibility/            # Accessibility concept + demo
  lib/
    concepts.ts               # Concept registry (single source of truth)
    useResizable.ts           # Custom hook for the responsive demo
    highlighter.ts            # Shared, code-split Shiki highlighter instance
    cn.ts                     # Class-name helper
docs/                         # Roadmap, playbooks, and planning docs
```

## License

[MIT](./LICENSE)
