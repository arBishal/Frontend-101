# API Calls Concept Page — Implementation Plan

## Goal

Teach beginners what API calls are by letting them trigger real HTTP requests and watch the full lifecycle (idle → loading → success / error) play out in both the UI and a "Network Inspector" panel.

## Files to Modify/Create

| Action | File |
|--------|------|
| Modify | `app/concepts/api-calls/page.tsx` |
| Create | `app/concepts/api-calls/ApiDemo.tsx` |

Same server/client split pattern as Components and State pages.

## ApiDemo.tsx — Detail

### Concept

A Pokemon lookup card. The user types a Pokemon name or ID, hits "Fetch", and sees the request lifecycle unfold. A Network Inspector panel (similar to the State Inspector on the state page) shows the raw request/response details updating in real time.

**Why Pokemon?** PokeAPI is free, no auth required, has visual data (sprites), and is fun — keeps beginners engaged.

### State pieces

| State variable | Type | Purpose |
|---|---|---|
| `query` | `string` | The search input (Pokemon name or ID) |
| `status` | `"idle" \| "loading" \| "success" \| "error"` | Current request lifecycle stage |
| `data` | `object \| null` | Parsed response (name, sprite URL, types) |
| `error` | `string \| null` | Error message if request fails |
| `responseTime` | `number \| null` | Time taken for the request in ms |

### Layout — Two panels side by side

```
┌───────────────────────────────────────────────────────┐
│  [Request Card]                │  [Network Inspector]  │
│                                │                       │
│  ┌──────────────────────────┐  │  status: "idle"       │
│  │  [input: "pikachu"  ] [Fetch] │  url: —            │
│  │                          │  │  method: GET          │
│  │  — idle state message —  │  │  response: —          │
│  │    OR                    │  │  time: —              │
│  │  — loading spinner —     │  │                       │
│  │    OR                    │  │                       │
│  │  — pokemon card result — │  │                       │
│  │    OR                    │  │                       │
│  │  — error message —       │  │                       │
│  └──────────────────────────┘  │                       │
└───────────────────────────────────────────────────────┘
```

On mobile, panels stack vertically (card on top, inspector below).

### Request Card details

- **Search row**: Text input + "Fetch" button (solid variant) side by side
  - Input placeholder: `"pikachu"`
  - Button disabled while loading
  - Pressing Enter also triggers fetch
- **Result area** — renders based on `status`:
  - **idle**: Subtle hint text — "Enter a Pokemon name or ID and hit Fetch"
  - **loading**: A simple spinner/pulse animation with "Fetching..." text
  - **success**: Pokemon card showing:
    - Sprite image (from `data.sprites.front_default`)
    - Name (capitalized)
    - Type badges (e.g. "electric") with color-coded pills
  - **error**: Red-tinted message — "Pokemon not found. Try another name or ID."

### Pokemon type color map

A small lookup for badge colors by Pokemon type:

| Type | Color |
|---|---|
| fire | `bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400` |
| water | `bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400` |
| grass | `bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400` |
| electric | `bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400` |
| (default) | `bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300` |

Keep the map small — just a few common types + a default fallback. This isn't a Pokedex, it's a teaching tool.

### Network Inspector details

- Same visual style as the State Inspector (`bg-zinc-900 dark:bg-zinc-800`, monospace, color-coded values)
- Fields displayed:

```
status     "idle"
url        —
method     GET
time       —
response   —
```

- **status** — color-coded:
  - `"idle"` → zinc
  - `"loading"` → amber
  - `"success"` → emerald
  - `"error"` → red
- **url** — shows the full PokeAPI URL when a request is made (string, green)
- **method** — always "GET" (string, green)
- **time** — response time in ms when complete (number, blue), "—" otherwise
- **response** — truncated preview of the response shape, e.g. `{ name, types, sprites }` on success, or the error message on failure

### API details

- Endpoint: `https://pokeapi.co/api/v2/pokemon/{query}`
- Method: GET
- No auth required
- Lowercase the query before fetching
- Use native `fetch()` — no external HTTP library

### Fetch logic (simplified)

```
async function handleFetch():
  set status → "loading", error → null, data → null
  record startTime
  try:
    response = await fetch(url)
    if !response.ok → throw
    json = await response.json()
    extract { name, types, sprites } from json
    set data, status → "success", responseTime
  catch:
    set error message, status → "error", responseTime
```

### Responsive behavior

- `sm:` and above: side-by-side (`flex flex-col sm:flex-row gap-4`)
- Below `sm`: stacked vertically
- Inspector: `sm:w-56 lg:w-64 shrink-0`

## page.tsx — Structure

```
metadata export (title: "API Calls | Frontend 101")

<div.flex.flex-col.gap-8.text-sm.lg:text-base>
  Header (h1 "API Calls" + description "How the frontend asks a server for data.")

  Section label "Interactive demo"
  <ApiDemo />

  "How it works" explanation:
    - An API call is how the frontend requests data from a server
    - The lifecycle: idle → loading → success or error
    - Every API call follows this pattern regardless of framework
    - The demo uses fetch() to call PokeAPI — a free, public REST API
    - The Network Inspector shows what's happening behind the scenes
    - Real apps handle all four states to give users clear feedback
</div>
```

## Component dependencies

- `lucide-react`: `Loader2` (spinning loader icon), `Search` (for fetch button or input icon)
- `@/app/components/ui/Button`: Fetch button (solid variant)
- No new shared components needed
- No new npm packages needed (native fetch)

## Verification

1. `npm run build` — no TypeScript errors
2. Typing a valid Pokemon name and clicking Fetch shows the result card
3. Typing an invalid name shows the error state
4. Network Inspector updates at each lifecycle stage
5. Loading state is visible (spinner) during the request
6. Dark mode renders correctly for both panels
7. Responsive: stacks on mobile, side-by-side on tablet+
8. No hydration errors (metadata server-side, interactions client-side)
9. Enter key triggers fetch from the input field
