# Learning Loop — Owning the "How" While Building with AI

> Snapshot date: 2026-07-17
> The third lens on frontend-101. [IMPROVEMENTS.md](./IMPROVEMENTS.md) covers the product, [SHOWCASE.md](./SHOWCASE.md) covers the repo as a hiring signal. This doc covers the builder: closing the gap between knowing *what* is being built and knowing every *how* — before an interview finds it first.

---

## 1. The actual risk

Building with AI is not the interview problem — in 2026, nobody credible penalizes it. The failure mode is being unable to go **one level deeper** than what's on screen when someone probes: "Why is this a client component?", "Walk me through your resize hook", "What breaks if I mutate this tree directly?"

So the fix is not a separate study plan. It's a workflow change that makes ownership of the "how" a *byproduct of shipping* — because a study plan competes with building time and loses, while a workflow change is free.

---

## 2. The keystone: reverse the direction of explanation

Right now the AI explains to the builder. Flip it — for everything that ships, the builder produces the explanation, with no AI assistance:

### 2.1 The ownership test on every concept page
Every concept page has a debrief section — a built-in Feynman test. Under the three-pass workflow in [WRITING.md](./WRITING.md) (Claude authors → you review → Claude revises), this habit lives in your review pass: close the page and explain the concept out loud — takeaway, misconception, what the demo proves. If you can't, the concept isn't owned yet, and that's exactly what an interviewer will find; flag it and close the gap before shipping. Reviewing the remaining concepts (Rendering, Events, the Event Loop) under this rule makes the product roadmap and the interview prep the same work.

### 2.2 Write every PR description yourself
Pairs with the PR workflow in SHOWCASE §3.2. Read the AI's diff, then explain in your own words what changed, how it works, and why this way. **Can't write it → don't merge it yet**; interrogate the code until you can. This turns the verification step the project needs anyway into a learning loop at zero extra time cost.

### 2.3 Predict before you read
Before asking AI to implement something, sketch your own approach — even three bullet points. Then diff the sketch against what came back. The gap between the two is precisely the missing "how", delivered as a personalized lesson on every task.

---

## 3. Supporting habits

- **Rebuild one hard thing by hand, occasionally.** Delete the file, rebuild without AI, compare. Best candidates in this repo: `useResizable`, the immutable tree helpers in `DomDemo` (`findNode`, `removeNode`, `addChild`, `treeToHtml`), theme toggling without a flash of wrong theme. One every week or two is plenty — these are exactly the pieces interviewers pick for "walk me through this."
- **Prompt for trade-offs, not just output.** Change "do X" to "do X, and tell me the two alternatives you rejected and why." Costs nothing; the trade-off vocabulary absorbed this way is what senior interviews are actually made of.
- **Get grilled on your own repo.** Periodically run an AI session in hostile-interviewer mode: "Probe me on frontend-101 the way a senior reviewer would — why is `CodeBlock` a client component, what happens without JS, why immutable updates?" Every stumble is a gap found *before* the real interview instead of during it. Log the stumbles; they are the syllabus.

---

## 4. The interview framing

Don't hide the AI workflow — present it. "I build with AI deliberately; here's my plan → build → verify loop, and here's my decision log" is a strong answer, **but only if the depth probe that follows goes well.** Every habit above exists to make sure it does.

Prepared assets this repo already produces:

- Per-concept plan docs — evidence of planning before building (archive finished ones in `docs/plans/`, per SHOWCASE §2)
- `docs/DECISIONS.md` (once created, per SHOWCASE §3.3) — each entry is a pre-written answer to "tell me about a trade-off you made"
- The Shiki before/after write-up (SHOWCASE §3.4) — a complete "found it, measured it, fixed it" story
- "How it works" sections written cold (§2.1) — proof the concepts are owned, not pasted

---

## 5. The one-line version

Ownership of the "how" comes from being the one who explains, predicts, and defends the code — the AI can write it, but if you can't teach it, you don't own it yet. This project teaches frontend fundamentals; applied honestly, building it *is* the curriculum.
