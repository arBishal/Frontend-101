# Accessibility Concept Page — Implementation Plan

## Goal

Teach beginners what web accessibility (a11y) is by showing a sample signup form that has intentional accessibility issues, paired with an Audit Panel where users toggle fixes on/off and see the form update live. Hands-on: users can also Tab through the form to feel the keyboard navigation difference.

## Files to Modify/Create

| Action | File |
|--------|------|
| Modify | `app/concepts/accessibility/page.tsx` |
| Create | `app/concepts/accessibility/AccessibilityDemo.tsx` |

Same server/client split pattern as other concept pages.

## AccessibilityDemo.tsx — Detail

### Concept

A "Create your account" signup form with 4 intentional a11y problems. An Audit Panel beside it lets users toggle fixes on/off, updating the form live.

### State

A single record tracking which fixes are active:

```ts
type Fix = "altText" | "contrast" | "labels" | "keyboard";

const [fixes, setFixes] = useState<Record<Fix, boolean>>({
  altText: false,
  contrast: false,
  labels: false,
  keyboard: false,
});
```

### Layout — Two panels side by side

```
┌──────────────────────────────────────────────────────────┐
│  [Signup Form]                 │  [Accessibility Audit]  │
│                                │                         │
│  ┌──────────────────────────┐  │  alt text       [OFF]   │
│  │  [logo placeholder]      │  │  contrast       [OFF]   │
│  │                          │  │  form labels    [OFF]   │
│  │  Create your account     │  │  keyboard       [OFF]   │
│  │                          │  │                         │
│  │  [___________________]   │  │  ──────────────         │
│  │  [___________________]   │  │  Score: 0 / 4           │
│  │  [___________________]   │  │                         │
│  │                          │  │                         │
│  │  [      Sign Up      ]   │  │                         │
│  └──────────────────────────┘  │                         │
└──────────────────────────────────────────────────────────┘
```

On mobile, panels stack vertically (form on top, audit below).

### The 4 issues and their fixes

#### 1. Image alt text
- **OFF**: Logo `<img>` (or placeholder icon) has no `alt` attribute (or `alt=""`)
- **ON**: `alt="Acme Corp logo"` is set. A small overlay pill appears on the logo showing the alt text (to make the fix visible)
- **Teaches**: Screen readers need alt text to describe images

#### 2. Color contrast
- **OFF**: The heading "Create your account" uses very low contrast (`text-zinc-300 dark:text-zinc-600` — nearly invisible against the background)
- **ON**: Text switches to proper contrast (`text-zinc-900 dark:text-zinc-50`)
- **Teaches**: Low contrast text is hard to read for low-vision users and in bright environments

#### 3. Form labels
- **OFF**: All three inputs (Name, Email, Password) have only `placeholder` attributes, no `<label>` elements
- **ON**: Visible `<label>` elements appear above each input, linked via `htmlFor`/`id`
- **Teaches**: Labels help screen readers identify inputs and improve click targets (clicking label focuses input)

#### 4. Keyboard access
- **OFF**: Sign Up button is a styled `<div>` with `onClick` and `cursor-pointer` — not focusable with Tab, no focus ring
- **ON**: Swaps to a real `<button>` element with a visible focus ring (`focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`)
- **Teaches**: Semantic HTML enables keyboard navigation; a `<div>` is invisible to keyboard users and screen readers

### Signup Form details

- Container: `rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6`
- Logo: A `size-10 rounded-lg bg-zinc-200 dark:bg-zinc-700` placeholder with a small icon inside (e.g. `Hexagon` from lucide-react, styled as a generic brand logo)
  - When alt text fix is ON: show a small monospace overlay pill (`absolute`, `text-[10px]`) with `"alt: Acme Corp logo"`
- Heading: "Create your account" — toggles between low-contrast and normal contrast classes, with `transition-colors`
- Inputs (3): Name, Email, Password
  - Same input style as other concept pages (`bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-2 text-sm`)
  - Placeholders: `"Full name"`, `"Email address"`, `"Password"`
  - Password input uses `type="password"`
  - When labels fix is ON: a `<label>` with `text-sm font-medium text-zinc-700 dark:text-zinc-300` appears above each input with `transition-opacity`
- Sign Up button:
  - OFF: `<div>` styled identically to a button — `bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md px-4 py-2 text-sm font-medium text-center cursor-pointer select-none`
  - ON: `<button>` with the same styles + `focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`
  - Both show the text "Sign Up"

### Audit Panel details

- Same visual style as Network Inspector / State Inspector (`bg-zinc-900 dark:bg-zinc-800`, monospace, `w-full sm:w-1/3 shrink-0`)
- Title: `"Accessibility Audit"` (same `text-xs uppercase tracking-widest text-zinc-500 mb-3` pattern)
- 4 rows (`space-y-2 text-xs`), each containing:
  - Issue label (left-aligned, `text-zinc-400`)
  - Toggle button (right-aligned):
    - OFF state: `text-red-400` showing `"OFF"`
    - ON state: `text-emerald-400` showing `"ON"`
    - Clickable to toggle the corresponding fix
- Divider: `border-t border-zinc-700 mt-4 pt-3`
- Score line: `"N / 4"` — color-coded:
  - 0: `text-red-400`
  - 1–2: `text-amber-400`
  - 3–4: `text-emerald-400`
  - When all 4: append `" — Perfect!"` in emerald

### Issue labels in the Audit Panel

| Key | Display label |
|---|---|
| `altText` | `alt text` |
| `contrast` | `contrast` |
| `labels` | `form labels` |
| `keyboard` | `keyboard` |

## page.tsx — Structure

```
metadata export (title: "Accessibility | Frontend 101")

<div.flex.flex-col.gap-8.text-sm.lg:text-base>
  Header (h1 "Accessibility" + description "Making sure the UI works for everyone.")

  Section label "Interactive demo"
  <AccessibilityDemo />

  "How it works" explanation:
    - Accessibility (a11y) means everyone can use your UI — including people
      who rely on screen readers, keyboard navigation, or have low vision
    - The four issues in the demo represent the most common real-world problems:
      - alt text: describes images for screen readers
      - contrast: ensures text is readable for everyone
      - labels: connects form inputs to their descriptions
      - semantic HTML: using <button> instead of <div> enables keyboard navigation
        and communicates purpose to assistive technology
    - Try Tabbing through the form with "keyboard" toggled off, then on —
      notice how the Sign Up button becomes reachable
    - These fixes are small but make a big difference
</div>
```

## Component dependencies

- `lucide-react`: `Hexagon` (logo placeholder icon)
- `@/app/components/ui/Button`: not used inside the demo — the Sign Up "button" is intentionally a raw element to demonstrate the semantic HTML issue
- No new shared components needed
- No new npm packages needed

## Verification

1. `npm run build` — no TypeScript errors
2. Toggling each fix updates the signup form live
3. With "keyboard" OFF, Tab skips the Sign Up div; with ON, Tab reaches the button and shows focus ring
4. Low contrast heading is noticeably hard to read when "contrast" is OFF
5. Label elements appear/disappear cleanly when "form labels" is toggled
6. Alt text overlay appears on the logo when "alt text" is ON
7. Dark mode renders correctly for both panels
8. Responsive: stacks on mobile, side-by-side on tablet+
9. No hydration errors
10. Audit panel score updates correctly as fixes are toggled
