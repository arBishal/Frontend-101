import type { HighlighterCore } from "shiki/core";

// Fine-grained Shiki highlighter: only the languages, themes, and regex engine
// this site actually uses, and the JavaScript engine instead of the Oniguruma
// WASM. Highlighting stays client-side because several demos highlight code
// generated from live state.
//
// Everything heavy (the core, the four grammars, the two themes, the engine) is
// loaded via dynamic import(), so it is code-split into its own chunk that loads
// on demand the first time a code block highlights — NOT part of any page's
// initial First Load JS. Created once and shared across every CodeBlock.
let highlighterPromise: Promise<HighlighterCore> | null = null;

export function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const [
        { createHighlighterCore },
        { createJavaScriptRegexEngine },
        githubLight,
        githubDark,
        html,
        css,
        jsx,
        tsx,
      ] = await Promise.all([
        import("shiki/core"),
        import("shiki/engine/javascript"),
        import("@shikijs/themes/github-light"),
        import("@shikijs/themes/github-dark"),
        import("@shikijs/langs/html"),
        import("@shikijs/langs/css"),
        import("@shikijs/langs/jsx"),
        import("@shikijs/langs/tsx"),
      ]);

      return createHighlighterCore({
        themes: [githubLight.default, githubDark.default],
        langs: [html.default, css.default, jsx.default, tsx.default],
        engine: createJavaScriptRegexEngine({ forgiving: true }),
      });
    })();
  }
  return highlighterPromise;
}
