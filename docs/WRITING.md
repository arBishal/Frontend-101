# Writing a Concept — The Playbook

> How every concept page gets written, reviewed, and refactored. Distilled from the 2026-07 instructor's review of the eight original pages (its findings now live in [IMPLEMENT.md](./IMPLEMENT.md) §7). Companion: [OWNERSHIP.md](./OWNERSHIP.md) (renamed from LEARNING.md) — the human review pass below is where its ownership habits live. When Claude executes a concept task, it follows [IMPLEMENT.md](./IMPLEMENT.md) (the technical runbook) alongside this doc; this doc owns the prose and pedagogy rules.

---

## The three-pass workflow

Every new concept (and every refactor of an existing one) goes through three passes:

| Pass | Who | Does what |
|---|---|---|
| **1 — Author** | Claude | Builds the concept end-to-end (plan → prose → demo) following Steps 0–7 and the voice rules below |
| **2 — Human review** | You | Reviews for ownership, voice, and truth — not typos (checklist in §Pass 2) |
| **3 — Revise** | Claude | Re-reviews against the pre-ship checklist, applies your feedback + its own findings, reports what changed and what was deliberately left |

The pass structure exists so no single author's blind spots ship: Claude writes with rules, you catch what rules can't (voice, truth, whether *you* own it), Claude catches what humans skim past (duplication, consistency, checklist mechanics).

---

## Pass 1 — Authoring (Claude)

### Step 0 — The five answers, written into the plan doc

Before any prose, answer these **in the concept's `PLAN-*.md`** so both reviewers can later check the page against them:

- [ ] **The one takeaway.** "If you remember one thing: ___." The whole page exists to earn this line; it closes the page verbatim.
- [ ] **The misconception.** What do beginners *wrongly believe* before learning this? (The DOM ≠ your HTML file; async ≠ multithreading.) Usually your opening.
- [ ] **The scene.** One concrete story beat with specifics — a number, a consequence, a small humiliation. "You change the button in three places. There were four."
- [ ] **The assumed knowledge.** The reader knows HTML/CSS basics and has seen JavaScript. They have NOT met: virtual DOM, SSR, promises, immutability, bundlers. Anything from that second list gets one plain-language clause or gets cut.
- [ ] **The demo verb.** What will the learner *do* — not watch? If the answer is "observe," redesign until they can break something.

### Step 1 — Title and subtitle
- Title: the concept's plain name. Subtitle: a one-line definition (never a demo instruction — those belong next to the demo).
- The same line goes in `concepts.ts` (description), page `metadata`, and the subtitle. Write once, use three times, keep identical.

### Step 2 — The opening (pick ONE, rotate across pages)
Never open with "X is Y" — definitions answer questions the learner hasn't asked yet. Rotate between:

1. **Misconception-first** — "Most beginners assume ___. It isn't, and here's the moment you see why."
2. **Question-first** — "When you click 'Add to cart', where does that number live?"
3. **Scene-first** — the Step 0 scene, then zoom out.
4. **Demo-first** — demo right after the title, explanation after. (See the Difference reads this way, but note *why* it can: its What and Why live on the Frameworks overview page — see "Multi-page concepts" below.)

Check the previous two concepts' openings; never the same type three pages in a row. The definition still appears — a paragraph or two in, once the learner wants it.

### Step 3 — "What is it?"
- 2–3 paragraphs, building: plain-words definition → how it actually behaves → the one analogy.
- **One analogy, made to work.** Ownable beats classic; if extending a classic, extend it until it teaches (LEGO's real lesson is the standardized stud = the props interface). No analogy found? A concrete walkthrough of a tiny example beats a forced metaphor.
- Code identifiers in `<code>`, sparingly. No API laundry lists here — reference material goes after the demo, when the learner has a reason to care.

### Step 4 — "Why it matters" + problem cards
- Prose carries the **argument** (2 paragraphs max). Cards carry **vignettes** — tiny concrete scenarios, never compressed restatements of the prose. If a card repeats the prose, one of them changes.
- Vary the card rhythm: one starts with a scenario, one is a single brutal sentence, one can run three sentences. Never three cards with the identical two-beat shape.
- Motivate with the human cost, not fear ("you pinch-zoom, mis-tap, give up" — not "search engines will penalize you").
- Any statistic appears **once** on the page. Prose or card, not both.

### Step 5 — The demo
- **Prediction prompt in the intro**: ask the learner to guess before they interact ("Before you click: what happens to a node's children when you delete it?"). A wrong prediction teaches twice as hard as a right explanation.
- The intro stays short — prompt plus one line of setup. Full usage guidance belongs in "How it works" (Step 6), where the learner looks for it.
- Design the demo to be **breakable** — the learner can do the wrong thing and see the consequence, not just the happy path.
- Follow with 2–3 **"break it" challenges** as short prompts ("Delete `<body>`. What survives?").

### Step 6 — "How it works" (usage + debrief)
This section keeps its established job — **telling the learner how to use the demo** (the controls, what each panel shows, what to try) — and adds the debrief on top. Rules:
- **Usage first, insight second.** Explain how to drive the demo, then name what the learner just did and reveal one thing they *didn't notice*.
- **Never restate the page's definition.** If a sentence from the top of the page fits here, delete it (the API Calls bug). Explaining the demo is this section's territory; re-explaining the concept is not.
- Reference bullets (properties, methods, states) are allowed here — the learner finally wants them — but they don't get the last word.
- One connective teaser to a related concept is welcome. One. Aimed at content that exists or is next on the roadmap.
- "What to notice" remains a valid alternate header when the section is mostly attention-directing.

### Step 7 — The close
- The Step 0 takeaway line, verbatim: "If you remember one thing: ___."
- Not a list. Not a summary paragraph. One line.

### Voice rules (every sentence, every pass)
1. **The desk test.** Would a person say this to a junior across a desk? If not, rewrite until they would.
2. **Max one "isn't X; it's Y"** construction per page.
3. **Break the triads.** Three lists-of-three on one page → rewrite one into a single dwelt-on example and one into a careless five.
4. **No grand closers.** Don't end paragraphs announcing their own significance ("That's the core promise of…"). Land the point, move on.
5. **First and second person allowed and encouraged.** The site is built by one person and can say so.
6. **Specifics beat adjectives.** "~60 lines of bookkeeping vs ~15" > "much more complex."
7. **At least one question** somewhere on the page (the prediction prompt usually covers this).

---

## Pass 2 — Human review (you)

Your pass is about the three things rules can't check. Don't copy-edit — flag and hand back.

- [ ] **Ownership test** (this is OWNERSHIP.md's cold-draft habit, relocated to fit the flow): close the page and explain the concept out loud — the takeaway, the misconception, how the demo proves it. **Anything you can't explain, flag it** — either the page teaches it badly, or you've found your own gap to close before shipping. Both are wins; shipping without the test is the only loss.
- [ ] **The desk test, out loud.** Read the prose as if saying it to a junior. Mark every sentence that sounds like documentation instead of a person. You are the site's voice — Claude approximates it; you're the authority on it.
- [ ] **Truth check.** Is the scene believable? Is the analogy honest, or does it break down in a way a learner will discover? Are the claims/stats ones you'd defend in an interview?
- [ ] **Step 0 fidelity.** Open the plan doc: does the page deliver the promised takeaway, misconception, scene, and demo verb — or did the draft drift?
- [ ] Leave feedback as directional notes ("card 2 sounds generated", "this analogy breaks because ___", "I couldn't explain the debrief — go deeper"), not rewritten sentences. Pass 3 does the rewriting; your notes double as the interview-prep artifact OWNERSHIP.md wants.

## Pass 3 — Revise (Claude)

Apply the human's notes, then run the mechanical checklist:

- [ ] Search the page for its own opening definition — it must not appear twice (the API Calls bug).
- [ ] Every statistic and claim appears exactly once.
- [ ] Jargon scan against the Step 0 assumed-knowledge line — each violation defined in a clause or cut.
- [ ] Voice-rule sweep: count contrastive constructions (≤1), triads, grand closers; check one scene / one analogy / one question / one takeaway all present.
- [ ] Subtitle = definition; demo instructions sit next to the demo; `concepts.ts` + `metadata` + subtitle carry the same one-liner.
- [ ] Grammar pass on the opening paragraph specifically (first sentences carry authority — see the Accessibility bug).
- [ ] Read the page in sequence after the previous two concepts — if the opening feels like a repeat, switch opening type.
- [ ] **Report honestly**: list what changed, what was flagged but deliberately kept (with the reason), and anything the human should re-check. Never silently drop a reviewer note.

If Pass 3 makes substantive changes (not typo-level), the page goes back through Pass 2 — a short second look, not a full re-review.

---

## Refactoring an existing concept

The eight live pages predate this playbook. When refactoring one:

1. **Start from IMPLEMENT.md §7** — each page's audit findings and the recommended refactor order are already written there. Don't re-diagnose from scratch.
2. **Keep the demo, rewrite the prose.** The demos are the right demos; refactors are prose-first. Demo changes (prediction prompts, break-it challenges) ride along only if small.
3. **Run it as the same three passes.** Pass 1 is "rewrite under Steps 0–7" — including writing the five Step 0 answers retroactively; they didn't exist for these pages, and forcing them surfaces what the page was never sure about.
4. **One page per refactor.** No batch rewrites — voice work degrades when parallelized, and sequential pages are how opening-type rotation stays checkable.
5. **Diff discipline:** the refactor commit touches one concept's prose. Anything discovered outside it (a UI bug, a shared component itch) goes to TODO.md, not the same commit.

---

## Structure skeleton (the parts, in order)

```
Title + subtitle (one-line definition)
Opening (misconception / question / scene / demo-first)
What is it? (2–3 paras, one analogy)
Why it matters (argument prose + vignette cards)
Interactive demo (prediction prompt → demo → break-it challenges)
How it works (usage + debrief + reference bullets)
Takeaway (one line)
```

### Multi-page concepts

A concept too large for one page splits into sub-pages — Frameworks is the precedent: Overview (What + Why), See the Difference (demo + debrief), Landscape (survey). The rule: **the What → Why → Demo → Debrief arc spans the concept, not each page.** Each sub-page carries its part of the arc and doesn't repeat sections a sibling already covered; the overview links forward, each sub-page links onward. Decide the split in the plan doc (which page owns What/Why, which owns the demo) so Pass 2 can check the arc is complete across the set rather than judging one page as incomplete.

The skeleton is a default, not a law. Deviate when the concept demands it; record why in the plan doc so Pass 2 knows it was a choice, not drift.
