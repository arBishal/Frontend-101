# IntersectionObserver

## What it is

`IntersectionObserver` is a browser API that tells you **when an element enters or leaves the viewport** (or another scroll container), asynchronously.

You give it a callback and tell it which element(s) to `observe()`. The browser then fires your callback only when an observed element's visibility crosses a threshold, for example when it first becomes visible or becomes fully hidden. Each callback receives an array of `entry` objects, and the useful field is `entry.isIntersecting`, a boolean for whether the element is currently in view.

```js
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    console.log(entry.target, entry.isIntersecting);
  }
});
observer.observe(someElement);
```

## Why we use it

The alternative is a `scroll` event listener that measures positions with `getBoundingClientRect()` on every tick. That is worse on two counts:

- **Performance.** A scroll handler runs on every scroll event, and reading layout inside it forces the browser to recompute layout each time. `IntersectionObserver` fires only on visibility *changes* and runs off the scroll path, so it stays cheap.
- **Simplicity.** You get a ready-made `isIntersecting` boolean instead of computing and comparing coordinates yourself.

Common uses: lazy-loading images, infinite scroll, scroll-triggered animations, and showing/hiding UI based on whether another element is on screen (our case).

## How we use it in our project

`app/components/ThemeToggleFloat.tsx` uses it to decide when the **floating** theme toggle should appear. The navbar already contains a theme toggle; the floating one is only needed once the navbar scrolls out of view.

```js
useEffect(() => {
  const nav = document.querySelector("nav");
  if (!nav) return;
  const observer = new IntersectionObserver(([entry]) =>
    setAtNav(entry.isIntersecting),
  );
  observer.observe(nav);
  return () => {
    observer.disconnect();
    setAtNav(false);
  };
}, [pathname]);
```

- It observes the page's `<nav>`.
- `entry.isIntersecting` is `true` while the navbar is on screen, `false` once scrolled past. We store that in `atNav`.
- The floating button hides itself (`opacity-0 pointer-events-none`, plus `aria-hidden` and `tabIndex={-1}` so it is skipped by screen readers and keyboard) while `atNav` is `true`, and fades in when the navbar leaves the viewport.

Net effect: the floating toggle shows up exactly when the "real" toggle in the navbar is no longer reachable.

### Two details worth remembering

- **Cleanup.** The effect returns `observer.disconnect()` so the observer stops when the component unmounts. Without it we would leak an observer on every mount.
- **Re-query on navigation.** The effect depends on `pathname` and re-runs `document.querySelector("nav")` on route change, because navigating swaps the DOM and the old `<nav>` node would be stale.

## API notes

The constructor takes an optional second argument with options:

- `root` — the scrolling ancestor to measure against. Defaults to the viewport.
- `rootMargin` — grow or shrink the trigger area, e.g. `"100px"` to fire 100px early.
- `threshold` — a number (or array) from 0 to 1 for how much of the element must be visible to count. `0` means any pixel, `1` means fully visible.

## References

- [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
