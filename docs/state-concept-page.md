# State Concept Page — Implementation Plan

## Goal

Teach beginners what "state" is through an interactive profile card where multiple types of state are visible and inspectable in real time.

## Files to Modify/Create

| Action | File |
|--------|------|
| Modify | `app/concepts/state/page.tsx` |
| Create | `app/concepts/state/StateDemo.tsx` |

Same server/client split pattern as the Components page — `page.tsx` exports metadata and static content, `StateDemo.tsx` holds all interactive logic.

## StateDemo.tsx — Detail

### State pieces (4 types)

| State variable | Type | Default | UI control |
|---|---|---|---|
| `name` | `string` | `"Jane"` | Inline editable text input |
| `status` | `"online" \| "away" \| "busy"` | `"online"` | Cycle button (clicking rotates through values) |
| `following` | `boolean` | `false` | Follow/Unfollow toggle button |
| `likes` | `number` | `0` | Heart button with count |

### Layout — Two panels side by side

```
┌─────────────────────────────────────────────────┐
│  [Profile Card]           │  [State Inspector]  │
│                           │                     │
│  ┌─────────────────────┐  │  name: "Jane"       │
│  │  avatar circle       │  │  status: "online"   │
│  │  name (editable)     │  │  following: false    │
│  │  status badge        │  │  likes: 0           │
│  │                      │  │                     │
│  │  [Follow] [♡ 0]      │  │                     │
│  └─────────────────────┘  │                     │
│                           │                     │
└─────────────────────────────────────────────────┘
```

- **Left panel — Profile Card**: A realistic-looking card with avatar placeholder, editable name, status badge, and action buttons. This is the "UI" that state drives.
- **Right panel — State Inspector**: A code-like readout showing each state variable and its current value, updating live. Styled like a mini devtools panel with monospace font and syntax-colored values.

On mobile, the two panels stack vertically (card on top, inspector below).

### Profile Card details

- **Avatar**: Skeleton circle, with a colored ring that reflects status color
- **Name**: Displayed as text, clicking it turns it into an input field (or always an input with transparent styling). Typing updates state live.
- **Status badge**: Small pill next to/below the name showing "online" / "away" / "busy" with color coding:
  - online → green (`bg-emerald-500`)
  - away → amber (`bg-amber-500`)
  - busy → red (`bg-red-500`)
  - Clicking cycles to next status
- **Follow button**: Uses shared `Button` component, `variant="outline"`. Toggles between "Follow" and "Following" text. "Following" state gets a filled/solid style.
- **Like button**: Heart icon from lucide-react. Shows count beside it. Clicking increments (simple increment, no unlike — keeps it simple for teaching).

### State Inspector details

- Styled as a rounded panel with dark bg (`bg-zinc-900 dark:bg-zinc-800`) and monospace text
- Each state variable on its own line:
  ```
  name      "Jane"
  status    "online"
  following  false
  likes      0
  ```
- Variable names in zinc-400, values color-coded by type:
  - string → green (`text-emerald-400`)
  - boolean → amber (`text-amber-400`)
  - number → blue (`text-sky-400`)
- Values update in real time with a brief highlight/flash animation when changed

### Responsive behavior

- `sm:` and above: side-by-side layout (`flex flex-col sm:flex-row gap-4`)
- Below `sm`: stacked vertically, inspector below the card
- Inspector takes less width than the card (`sm:w-64 shrink-0` vs `flex-1`)

## page.tsx — Structure

```
metadata export (title: "State | Frontend 101")

<div.flex.flex-col.gap-8.text-sm.lg:text-base>
  Header (h1 "State" + description "How apps remember things that change.")

  Section label "Interactive demo"
  <StateDemo />

  "How it works" explanation:
    - State = data that can change over time
    - When state changes, the UI re-renders to reflect the new value
    - The inspector shows exactly what data the profile card is reading
    - Four types demonstrated: string (name), enum (status), boolean (following), number (likes)
    - Each click/keystroke updates state → triggers re-render → UI updates
    - This is the core loop of every interactive UI
</div>
```

## Component dependencies

- `lucide-react`: `Heart` icon for likes button
- `@/app/components/ui/Button`: Follow button (shared component)
- No new shared components needed

## Verification

1. `npm run build` — no TypeScript errors
2. All four state interactions work independently
3. Inspector values update in sync with card interactions
4. Dark mode renders correctly for both panels
5. Responsive: stacks on mobile, side-by-side on tablet+
6. No hydration errors (metadata server-side, interactions client-side)
