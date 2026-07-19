# Shiki: full client bundle → deferred fine-grained highlighter

**Date:** 2026-07-19
**Area:** Performance · client JavaScript
**Touched:** `app/lib/highlighter.ts` (new) · `app/components/ui/CodeBlock.tsx` · `package.json`

## Summary

Replaced the full Shiki bundle with a fine-grained highlighter that carries only the four languages, two themes, and JavaScript regex engine this site actually uses, and **defers all of it out of First Load** via dynamic `import()`. The Oniguruma WASM engine is gone, and **First Load JS on code-block pages dropped ~21%** (`/concepts/the-dom`: 256 → 203 KB gzipped). Highlighting now costs a code-block page essentially the same First Load as a page with no code at all.

## The issue

`CodeBlock` imported `codeToHtml` from `"shiki"`, which pulls `shiki/bundle/full` — *every* language grammar plus the Oniguruma **WASM** engine. A Lighthouse audit (2026-07-17) flagged ~46 KB of unused JavaScript on concept pages, and the production build emitted **331** JS chunks totalling **12.1 MB** because the full bundle generates a separate chunk for every grammar it knows about. This site's only code samples are `html`, `css`, `jsx`, and `tsx` — shipping hundreds of grammars and a WASM engine to render four languages is waste.

A literal "move highlighting to the server" isn't possible: `DomDemo` (`treeToHtml(tree)`) and `ComponentDemo` (`buildJsxSnippet(disabledMap)`) highlight code generated from live client state, which the server never sees. Highlighting must stay client-side — so the goal is to make it small **and** keep it off the critical path.

## The approach

A shared highlighter in `app/lib/highlighter.ts`:

- **`createHighlighterCore`** (`shiki/core`) — minimal core, no languages bundled in
- only the **`html`, `css`, `jsx`, `tsx`** grammars and **`github-light` / `github-dark`** themes
- **`createJavaScriptRegexEngine`** (`shiki/engine/javascript`) — native JS `RegExp`, **no Oniguruma WASM**
- every heavy piece loaded via **dynamic `import()`**, so it code-splits into on-demand chunks that load the first time a code block highlights — *not* part of any page's First Load

Created once, reused across every `CodeBlock`. `CodeBlock` stays a client component (required, per the constraint above) but calls this singleton instead of the full-bundle `codeToHtml`; its public props are unchanged, so all four call sites were untouched. `@shikijs/langs` and `@shikijs/themes` were promoted to direct dependencies and the lockfile synced.

## Results

First Load JS measured from each prerendered page's referenced chunk set, gzipped (Next 16 / Turbopack does not print per-route First Load JS):

| Metric | Before | After |
|---|---|---|
| First Load JS — `/concepts/the-dom` (gzip) | 256 KB | **203 KB** (−21%) |
| First Load JS — `/concepts/components` (gzip) | 255 KB | **202 KB** (−21%) |
| Control — `/concepts/state`, no code block (gzip) | 206 KB | 206 KB (unchanged) |
| Oniguruma WASM shipped | yes | **none** — no `.wasm` in client output |
| Generated client JS (all chunks) | 331 chunks / 12.1 MB | 31 chunks / 1.6 MB |
| Highlighter (core + 4 grammars + 2 themes + engine) | in First Load core + lazy WASM/grammars | ~125 KB gzip, **on-demand after first paint**, no WASM |

The control page (`state`, no code block) is unchanged, confirming the delta is entirely the highlighter. A code-block page now carries essentially the same First Load as a no-code page — the highlighter loads asynchronously only if and when a code block renders.

## Verification

- Config verified in isolation to render all four languages including TSX (the JS engine's historically tricky grammar); `forgiving: true` degrades any unsupported pattern gracefully instead of throwing.
- Before/after First Load measured from the prerendered chunk sets, gzipped — not estimated.
- Production build compiles; TypeScript passes; changed files lint clean.
- Visually confirmed in a running browser.

## Deliberately not done

- **Server-rendering the one static demo** (`FrameworkDemo`) to remove its first-paint highlight flash — marginal, and awkward across the client/server boundary.
