# Landing Page Implementation Plan

## Overview

Build the home page for "Frontend 101" — a polished landing page that lists all concept pages and serves as the entry point for the resource. Custom components only, no external UI libraries.

## Step 1: Create the Data Model

**File:** `app/lib/concepts.ts`

- Define the `Concept` type (`slug`, `title`, `description`, `status`)
- Export the `concepts` array with all 6 entries (5 available + 1 coming-soon)

## Step 2: Create Shared UI Components

### `app/components/Navbar.tsx`

- Site name in monospace (e.g. "Frontend 101")
- Simple links: "About" (anchor to concept grid or hero), GitHub link
- Clean, minimal — no hamburger menu needed (few links)

### `app/components/Footer.tsx`

- Minimal footer — site name, a one-liner like "A learning resource for new frontend devs"

### `app/components/ConceptCard.tsx`

- Props: accepts a `Concept` object
- **Available:** renders as a `<Link>` to `/concepts/{slug}`, with title + description, subtle hover effect
- **Coming-soon:** same card shape but muted colors, "Coming soon" badge, no link/click

## Step 3: Build the Home Page

**File:** `app/page.tsx` (replace the current Next.js boilerplate)

- **Navbar** — top of page
- **Hero section** — heading ("Frontend Concepts, Explained") + one-liner subtitle explaining the resource
- **Concept grid** — maps over `concepts` array, renders `ConceptCard` for each. Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop
- **Footer** — bottom of page

## Step 4: Update Layout & Global Styles

### `app/layout.tsx`

- Update metadata (title: "Frontend 101", description matching the project)
- Keep Geist + Geist Mono fonts (they fit the developer aesthetic)

### `app/globals.css`

- Keep existing Tailwind setup
- No extra custom CSS needed — Tailwind utilities + existing CSS variables cover it

## Design Approach

- **Developer/editor aesthetic** using Geist Mono for labels, card badges, and accents
- **One deliberate accent color** — something like electric teal or warm amber, used sparingly (card hover, badges, hero accent)
- Clean white background, restrained typography, generous whitespace
- Coming-soon cards get reduced opacity + a monospace "Coming soon" badge
- Both dark and light themes work via existing `prefers-color-scheme` setup (full theming comes later with the State concept page)

## Files to Create/Modify

| Action | File                          |
| ------ | ----------------------------- |
| Create | `app/lib/concepts.ts`         |
| Create | `app/components/Navbar.tsx`    |
| Create | `app/components/Footer.tsx`    |
| Create | `app/components/ConceptCard.tsx` |
| Modify | `app/page.tsx`                |
| Modify | `app/layout.tsx`              |

## Dependencies

None. Everything uses Next.js, React, and Tailwind CSS.
