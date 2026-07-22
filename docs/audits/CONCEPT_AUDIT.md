# Concept Audit — Fresher Read-Through

> A beginner-perspective pass over all live concept pages (2026-07-22), read in sidebar order as someone who knows basic HTML/CSS and a little JavaScript. Flags only; nothing here has been applied.
>
> **Scope note:** API Calls was initially excluded pending its own refactor. That refactor shipped (see `docs/plans/PLAN-api-calls.md` plus the follow-up methods-section restructure), and a fresher re-read on 2026-07-22 produced the API Calls section below.

## Cross-cutting: "break it" bullets spoil themselves

WRITING.md's model for a break-it challenge is a question ("Delete `<body>`. What survives?"), but most live bullets state the outcome before the learner has tried it:

- The DOM, bullet 1: "Its `<p>` and `<span>` go with it, and the Source panel turns red."
- Components: all three bullets describe the result.
- State: all three bullets describe the result.

The learner reads the answer, then performs the action as confirmation instead of discovery. Related: on The DOM, Components, and Accessibility, the prediction prompt and break-it #1 are the *same* exercise, so the first challenge is already done by the time the learner reaches it.

**Suggested fix:** turn at least one bullet per page back into question form, and make break-it #1 probe something the prediction prompt didn't.

## Per-page flags

### API Calls (fresher re-read after the refactor, 2026-07-22)

- **The method examples point at things that were never introduced.** The list reads: POST "(submit the login form)", PUT "updates an existing item (edit that post)", DELETE "(delete the comment for good)". As a fresher: *which* post? *what* comment? The parentheticals read like they refer back to one running example, but each names a different object out of nowhere. One continuing object through the write methods would fix it (e.g. add a comment → edit that comment → delete it).
- **POST's example undercuts its definition.** The rule taught is "POST creates something new," and the example is submitting a login form. Logging in doesn't obviously create anything a beginner can picture (it creates a session, which is beyond the page's assumed knowledge). The verb and the example fight each other; a visible creation (post a comment, place an order) matches the definition.
- **Three different "fours" back to back.** "Really four screens" (Why it matters) → "The four request methods" → "the four states (idle, loading, success, error)" in the demo prompt. Screens/states/methods are two distinct sets of four introduced in adjacent sections, and the fresher has to keep them apart. Minor, but one linking clause ("those four screens map to four states the request itself moves through") would prevent the double-take.
- **"The url the inspector shows"** (How it works): lowercase "url" where the rest of the page writes "URL". Reads as a typo.
- **Break-it bullets 1 and 3 state their outcomes** before the learner tries them, so the page now shares the site-wide spoiler pattern flagged in the cross-cutting section above.

What worked: the weather-app question opening lands; the restaurant analogy honestly carries the waiting-and-failure point; the methods section sitting just before a GET-only demo, with the "the other three need a server built to accept changes" caveat, reads naturally and doesn't overpromise.

### Responsiveness

- The page teaches breakpoints, then How-it-works explains the demo uses container queries and shows only `@container` syntax. A fresher leaves the page never having seen a real `@media` query, the thing they'd actually type on their own site. Add a short `@media` equivalent alongside the `@container` block.
- Break-it #3 depends on the width readout ("park the width at 900px"), but the readout is only introduced afterward in How-it-works.

### Accessibility

- The Tab-skips-the-div point appears three times with the same reveal ("because a `<div>` can't hold focus"): prediction prompt, break-it #1, and the How-it-works closing paragraph. Prediction + debrief is enough; break-it #1 could probe something else (e.g., what a screen reader announces with labels off).
- The "Later becomes court" card title is oblique; it's the one card on the site that takes two reads to parse.

### Frameworks (Overview)

- Subtitle/registry description "The manual pain frameworks were built to remove" is the only subtitle on the site that isn't a definition (Step 1 rule: subtitle = one-line definition). On the homepage cards it's the one description that doesn't say what the thing is.

### Frameworks (Landscape)

- Svelte's "does its work when you build the app rather than in the browser" assumes the reader knows there's a build step; "when you build the app" reads as "while you're developing." A three-word gloss (e.g. "a compile step") fixes it.

## What worked (no action needed)

- The DOM's recipe/plated-dish analogy carries the whole page; the View Source exercise is the site's best "go try this right now" moment.
- State and Components hand off to each other cleanly in reading order.
- See the Difference's line-count framing is exactly the evidence a skeptical beginner wants.

## Suggested priority

1. Break-it question-form pattern (site-wide).
2. Responsiveness `@media` gap.
3. Remaining per-page polish (Accessibility repetition, card title, subtitle, Svelte gloss).
