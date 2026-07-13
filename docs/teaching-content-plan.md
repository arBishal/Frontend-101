# Teaching Content Plan

**Date:** 2026-07-13
**Goal:** Make every concept page self-contained so a learner can understand the *what* and *why* before interacting with the demo.
**Reference:** The frameworks concept pages are the "complete" standard.

---

## Current vs Target Structure

### Current (all non-framework pages)

```
Title + subtitle
Interactive demo
"How it works" (brief post-demo explanation)
```

### Target

```
Title + subtitle
"What is [concept]?"        <- NEW (2-3 paragraphs)
"Why it matters"            <- NEW (concrete motivation)
Interactive demo            <- UNCHANGED
"How it works"              <- UNCHANGED
```

---

## Unchanged

- All demo components — no modifications
- Existing "How it works" sections — kept as-is
- No sub-pages added for any concept
- Frameworks pages — already complete

---

## Per-Concept Draft Content

### 1. Components

**File:** `app/concepts/components/page.tsx`
**Status:** [ ] Draft reviewed — [x] Implemented

#### What is a component?

A component is a self-contained, reusable piece of UI. Instead of writing one
massive HTML file, you break the interface into smaller parts — a button, a
card, a sidebar — each responsible for its own markup and style.

Think of components like LEGO bricks. Each brick has a specific shape and
purpose, but you can snap them together in countless combinations to build
something complex. A single `<StatCard>` component can be reused four times in a
grid — same structure, different data.

Components also accept **props** — inputs that let you customize what they
render. A `<Button>` component might accept a `variant` prop to switch between
"primary" and "outline" styles. Same component, different look, zero code
duplication.

#### Why it matters

Without components, you'd copy-paste the same HTML everywhere. Need to change
how a card looks? Update it in every single place. Miss one? You have a visual
bug.

With components, you change the code once and every instance updates
automatically. This is the DRY principle — Don't Repeat Yourself — applied to
your UI. It's also how every modern design system works: teams build a shared
library of components (buttons, modals, form fields) that the entire app
consumes.

---

### 2. State

**File:** `app/concepts/state/page.tsx`
**Status:** [ ] Draft reviewed — [x] Implemented

#### What is state?

State is data that changes over time. A plain HTML page is static — the content
is baked in and never moves. State is what makes a UI *interactive*: a counter
that increments, a toggle that opens a menu, a text field that updates as you
type.

In frameworks like React, state is a special kind of variable. When you update
it, the framework automatically re-renders the parts of the UI that depend on
it. You don't touch the DOM yourself — you change the data, and the screen
follows.

Common examples of state: whether a user is logged in, the items in a shopping
cart, the current value of a search input, which tab is selected.

#### Why it matters

Without state management, you'd have to manually find the right DOM element and
update its content every time something changes. For a simple counter, that's
manageable. For a form with validation, conditional fields, and error messages,
it quickly becomes a tangled mess.

State is the single source of truth for your UI. When you keep state and
rendering in sync automatically, you eliminate the #1 source of UI bugs: the
screen showing something different from what the data says.

---

### 3. Responsive Design

**File:** `app/concepts/responsiveness/page.tsx`
**Status:** [ ] Draft reviewed — [x] Implemented

#### What is responsive design?

Responsive design is a single codebase that adapts its layout to any screen
size — phone, tablet, or desktop. Instead of building separate mobile and
desktop versions of your site, you write one set of HTML and CSS that
reorganizes itself based on the available space.

The core tool is the **CSS breakpoint** (also called a media query): a rule
that says "when the screen is wider than X pixels, apply these styles." Below
that width, a different set of styles takes over. This is how a three-column
desktop grid can collapse into a single-column mobile stack without changing
any HTML.

Other key techniques include flexible grids (columns that resize proportionally),
relative units like `rem` and `%` instead of fixed pixels, and fluid images that
scale with their container.

#### Why it matters

Over half of all web traffic comes from mobile devices. If your layout only
works on a desktop monitor, you're locking out the majority of your users.

Responsive design isn't a bonus feature — it's the expected baseline. Search
engines penalize non-responsive sites, and users will leave if they have to
pinch-zoom to read text or scroll sideways to see content. One responsive
codebase is also far cheaper to maintain than separate mobile and desktop
versions.

---

### 4. API Calls

**File:** `app/concepts/api-calls/page.tsx`
**Status:** [ ] Draft reviewed — [x] Implemented

#### What is an API call?

An API call is how the frontend asks a server for data. Your app doesn't store
everything locally — user profiles, product listings, weather forecasts — that
data lives on a server somewhere. The frontend sends an HTTP request, the
server processes it, and sends back a response (usually JSON).

The browser has a built-in function for this: `fetch()`. You give it a URL, it
sends a request, and returns a promise that resolves with the server's response.
The most common request type is `GET` (read data), but there's also `POST`
(create), `PUT` (update), and `DELETE` (remove).

API stands for Application Programming Interface — it's a contract that defines
how two systems talk to each other. A REST API organizes its data into URLs
(called endpoints): `/users/42` returns user #42, `/pokemon/pikachu` returns
Pikachu's stats.

#### Why it matters

Almost every real application depends on external data. A social feed loads
posts from a server. A weather app fetches forecasts from an API. A checkout
page sends your order to a payment service.

Without APIs, every piece of data would need to be hardcoded into the page — no
dynamic content, no personalization, no real-time updates. Understanding the
request lifecycle — idle, loading, success, error — is essential for building
UIs that feel reliable and responsive, even when the network is slow or the
server is down.

---

### 5. Accessibility

**File:** `app/concepts/accessibility/page.tsx`
**Status:** [ ] Draft reviewed — [x] Implemented

#### What is accessibility?

Accessibility — often shortened to **a11y** (a, then 11 letters, then y) —
means making sure your UI works for everyone, including people with
disabilities. That includes users who navigate with a keyboard instead of a
mouse, people who rely on screen readers to hear what's on screen, and users
with low vision who need sufficient color contrast.

It's not a niche concern. Accessibility covers a wide spectrum: permanent
disabilities (blindness, motor impairments), temporary ones (a broken arm), and
situational ones (using your phone in bright sunlight). Designing for
accessibility means designing for all of these.

The web has built-in accessibility features — semantic HTML elements like
`<button>`, `<label>`, and `<nav>` carry meaning that assistive technology can
read. The most common accessibility failures aren't hard problems; they're
simple oversights: missing alt text, low contrast, clickable `<div>`s instead
of `<button>`s, form inputs without labels.

#### Why it matters

Roughly 15% of the world's population lives with some form of disability.
Building an inaccessible UI means excluding real people from using your product.

Beyond ethics, it's often a legal requirement. Laws like the ADA (US) and the
European Accessibility Act mandate accessible digital experiences, and WCAG
(Web Content Accessibility Guidelines) is the standard they reference.

The good news: accessible code is usually *better* code. Semantic HTML is
easier to style, easier to test, and easier to maintain. A logical focus order
makes keyboard shortcuts possible. Clear labels make forms less confusing for
*everyone*. Fixing accessibility doesn't add complexity — it removes it.

---

## Implementation Notes

- Each page gets two new `<div>` sections inserted between the title block and the "Interactive demo" block.
- Each section uses the existing `<SectionLabel>` component for headings.
- Text styling matches the existing "How it works" sections: `text-zinc-600 dark:text-zinc-400 space-y-3`.
- No new components, files, or dependencies needed.
- Estimated ~20-30 lines of new JSX per page.
