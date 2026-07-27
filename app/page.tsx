import { Star, MessageSquarePlus } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import BrowserMockup from "@/app/BrowserMockup";
import { concepts } from "@/app/lib/concepts";

// Curated, most recent user-facing changes only — not an exhaustive log.
const changelog = [
  {
    date: "2026-07-24",
    title: "Consistent theming",
    description:
      "A scroll-aware light/dark toggle and a token-based palette that keeps every page readable in both modes.",
  },
  {
    date: "2026-07-22",
    title: "Keyboard-friendly demos",
    description:
      "Every interactive demo now works fully from the keyboard, including the drag-to-resize viewport.",
  },
  {
    date: "2026-07-21",
    title: "Clearer explanations",
    description:
      "All seven concepts rewritten for clarity, each closing with a single-sentence takeaway.",
  },
];

async function getStarCount(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/arBishal/Frontend-101",
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.stargazers_count;
  } catch {
    return null;
  }
}

export default async function Home() {
  const stars = await getStarCount();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-12">
      {/* Dot grid background */}
      <div
        className="dot-grid dark:dot-grid-dark pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* hero */}
      <div className="flex min-h-dvh max-w-4xl flex-col items-center justify-center gap-3 py-10 text-center md:gap-4">
        <div className="animate-fade-in-up inline-flex items-center gap-2 font-mono text-sm font-medium md:text-base">
          <span className="text-subtle">$</span>
          <span className="bg-linear-to-l from-zinc-600 to-zinc-500 bg-clip-text text-transparent dark:from-zinc-400 dark:to-zinc-500">
            learn frontend-101
          </span>
        </div>

        <h1 className="animate-fade-in-up anim-delay-150 text-strong text-4xl font-bold md:text-5xl lg:text-7xl">
          Frontend Concepts, <span className="text-subtle">Explained</span>
        </h1>

        <p className="animate-fade-in-up anim-delay-300 text-muted max-w-md text-lg md:text-xl">
          Interactive, visual explanations of concepts every frontend developer
          runs into early on.
        </p>

        <div className="animate-fade-in-up anim-delay-450 mt-3 grid w-full max-w-3xs grid-cols-1 gap-3 sm:w-auto sm:max-w-none sm:grid-cols-2 md:mt-4 md:gap-4">
          <Button
            variant="outline"
            href="https://github.com/arBishal/Frontend-101"
            className="group/star justify-center"
          >
            {stars !== null && (
              <span className="text-subtle tabular-nums">{stars}</span>
            )}
            <Star className="size-4 transition-colors group-hover/star:fill-yellow-400 group-hover/star:text-yellow-400" />
            on GitHub
          </Button>
          <Button
            href={`/concepts/${concepts[0].slug}`}
            className="order-first justify-center sm:order-0"
          >
            Explore the demos
            <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
        {/* Hero visual */}
        <div className="animate-fade-in-up anim-delay-600 relative mt-8 flex w-full justify-center md:mt-12">
          <div className="flex w-full justify-center sm:hidden">
            <BrowserMockup variant="mobile" />
          </div>
          <div className="hidden w-full justify-center sm:flex">
            <BrowserMockup variant="desktop" />
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-4xl py-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-subtle mb-4 font-mono text-base tracking-widest uppercase md:text-lg">
            What&apos;s covered
          </h2>
          <h3 className="text-strong text-2xl font-bold md:text-3xl">
            The Core Concepts
          </h3>
          <p className="text-muted mt-2 max-w-md text-base md:text-lg">
            Each idea paired with an interactive demo.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {concepts.map((concept) => {
            const Icon = concept.icon;
            return (
              <Card
                key={concept.slug}
                href={`/concepts/${concept.slug}`}
                className="group p-6 transition hover:-translate-y-0.5 hover:border-zinc-400 dark:hover:border-zinc-600"
              >
                <div className="mb-1 flex items-center gap-3 md:gap-4">
                  <Icon className="text-subtle size-4 transition-colors group-hover:text-zinc-600 md:size-5 dark:group-hover:text-zinc-300" />
                  <h3 className="text-strong text-base font-medium transition-colors group-hover:text-zinc-950 md:text-lg dark:group-hover:text-zinc-50">
                    {concept.title}
                  </h3>
                </div>
                <p className="text-muted text-sm md:text-base">
                  {concept.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Changelog — recent updates only */}
      <div className="relative w-full max-w-2xl py-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-subtle mb-4 font-mono text-base tracking-widest uppercase md:text-lg">
            Changelog
          </h2>
          <h3 className="text-strong text-2xl font-bold md:text-3xl">
            Recently Shipped
          </h3>
          <p className="text-muted mt-2 max-w-md text-base md:text-lg">
            A few of the latest improvements.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {changelog.map((entry) => (
            <li
              key={entry.title}
              className="border-default flex flex-col gap-1 rounded-lg border p-4 sm:flex-row sm:gap-4"
            >
              <span className="text-subtle shrink-0 font-mono text-xs sm:w-24">
                {entry.date}
              </span>
              <div>
                <h4 className="text-strong text-sm font-medium md:text-base">
                  {entry.title}
                </h4>
                <p className="text-muted text-sm md:text-base">
                  {entry.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* What's next — sneak peek */}
      <div className="relative flex w-full max-w-4xl flex-col items-center py-10 text-center">
        <h2 className="text-subtle mb-4 font-mono text-base tracking-widest uppercase md:text-lg">
          What&apos;s next
        </h2>
        <h3 className="text-strong text-2xl font-bold md:text-3xl">
          How to Approach a Component
        </h3>
        <p className="text-muted mt-2 max-w-md text-base md:text-lg">
          Breaking down real UI challenges.
        </p>

        {/* Autocomplete mockup */}
        <div className="mt-8 w-full max-w-sm" aria-hidden="true">
          <div className="border-default overflow-hidden rounded-lg border">
            {/* Search input */}
            <div className="bg-surface flex items-center gap-3 px-4 py-3">
              <div className="size-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600" />
              <div className="h-3 w-24 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <div className="ml-auto h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            </div>
            {/* Suggestion rows */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-center gap-3 border-t border-zinc-100 px-4 py-2.5 dark:border-zinc-800/60 ${i === 1 ? "bg-raised" : "bg-surface"}`}
              >
                <div className="size-3 rounded-sm bg-zinc-300 dark:bg-zinc-700" />
                <div
                  className="h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-800"
                  style={{ width: `${100 - i * 20}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <span className="border-default text-subtle mt-6 inline-block rounded-full border px-4 py-1.5 text-xs font-medium tracking-wider uppercase">
          Coming soon
        </span>
      </div>

      <div className="relative flex flex-col items-center gap-4 py-10 text-center">
        <p className="text-muted text-sm md:text-base">
          Have a suggestion or found something to improve?
        </p>
        <Button
          variant="outline"
          href="https://github.com/arBishal/Frontend-101/issues"
        >
          <MessageSquarePlus className="size-4" />
          Open an issue on GitHub
        </Button>
      </div>
    </main>
  );
}
