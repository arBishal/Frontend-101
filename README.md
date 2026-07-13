# Frontend 101

Interactive, visual explanations of core frontend concepts for new developers.

## What is this?

Frontend 101 is an educational site that teaches fundamental frontend development concepts through interactive demos and clear explanations. Each concept page includes a breakdown of what it is, why it matters, and a hands-on demo you can play with.

## Concepts covered

- **Components** — Why we build UIs out of reusable pieces
- **State** — How data drives what the user sees
- **Responsiveness** — Layouts that adapt to any screen size
- **API Calls** — How the frontend asks a server for data
- **Accessibility** — Making sure the UI works for everyone
- **Frameworks** — Why frameworks exist and how they differ

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Shiki](https://shiki.style/) for syntax highlighting
- [Lucide](https://lucide.dev/) for icons

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
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm start`     | Serve production build   |
| `npm run lint`  | Run ESLint               |

## Project structure

```
app/
  layout.tsx                  # Root layout
  page.tsx                    # Landing page
  globals.css                 # Global styles
  components/                 # Shared components
    ui/                       # Reusable UI primitives (Button, Card, etc.)
    ThemeProvider.tsx          # Dark/light theme management
    ThemeToggle.tsx            # Theme toggle button
    Navbar.tsx                # Top navigation
    ConceptSidebar.tsx        # Concept page sidebar
  concepts/
    components/               # Components concept + demo
    state/                    # State concept + demo
    responsiveness/           # Responsive design concept + demo
    api-calls/                # API calls concept + demo
    accessibility/            # Accessibility concept + demo
    frameworks/               # Frameworks overview, landscape, and diff demo
  lib/                        # Utilities and shared data
docs/
  TODO.md                     # Planned improvements
```

## License

This project is for educational purposes.
