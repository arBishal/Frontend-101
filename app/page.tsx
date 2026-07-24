import { Star, MessageSquarePlus } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import { concepts } from "@/app/lib/concepts";

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

function BrowserMockup() {
  return (
    <div
      className="border-default w-full max-w-lg overflow-hidden rounded-lg border"
      aria-hidden="true"
    >
      {/* Title bar */}
      <div className="border-default flex items-center gap-2 border-b bg-zinc-100 px-4 py-3 dark:bg-zinc-900">
        <div className="flex gap-2">
          <div className="size-3 rounded-full bg-red-300 dark:bg-red-400/40" />
          <div className="size-3 rounded-full bg-yellow-300 dark:bg-yellow-400/40" />
          <div className="size-3 rounded-full bg-green-300 dark:bg-green-400/40" />
        </div>
        <div className="mx-8 h-5 flex-1 rounded-xs bg-zinc-300 dark:bg-zinc-800" />
      </div>
      {/* Content */}
      <div className="bg-surface flex gap-3 p-3 sm:p-4">
        {/* Sidebar */}
        <div className="w-10 shrink-0 space-y-3 pt-1 sm:w-14">
          <div className="h-2 w-8 rounded-full bg-zinc-400 sm:w-10 dark:bg-zinc-700" />
          <div className="h-2 w-6 rounded-full bg-zinc-300 sm:w-8 dark:bg-zinc-800" />
          <div className="h-2 w-7 rounded-full bg-zinc-300 sm:w-12 dark:bg-zinc-800" />
          <div className="h-2 w-5 rounded-full bg-zinc-300 sm:w-9 dark:bg-zinc-800" />
        </div>
        {/* Main */}
        <div className="min-w-0 flex-1 space-y-3">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-raised border-default space-y-2 rounded-sm border p-2 sm:p-3"
              >
                <div className="h-2 w-6 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <div className="h-3 w-8 rounded-full bg-zinc-400 dark:bg-zinc-700" />
              </div>
            ))}
          </div>
          {/* Table */}
          <div className="bg-raised border-default overflow-hidden rounded-sm border">
            <div className="bg-inset dark:bg-inset/50 flex gap-4 px-3 py-2">
              <div className="h-2 w-12 rounded-full bg-zinc-400 dark:bg-zinc-700" />
              <div className="hidden h-2 w-10 rounded-full bg-zinc-400 sm:block dark:bg-zinc-700" />
              <div className="ml-auto h-2 w-8 rounded-full bg-zinc-400 dark:bg-zinc-700" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border-default flex gap-4 border-t px-3 py-2"
              >
                <div className="h-2 w-14 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <div className="hidden h-2 w-10 rounded-full bg-zinc-300 sm:block dark:bg-zinc-800" />
                <div className="ml-auto h-2 w-6 rounded-full bg-zinc-300 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const stars = await getStarCount();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-4 pb-12">
      {/* Dot grid background */}
      <div
        className="dot-grid dark:dot-grid-dark pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* hero */}
      <div className="flex h-dvh max-w-4xl flex-col items-center justify-center gap-3 text-center md:gap-4">
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

        <div className="animate-fade-in-up anim-delay-450 mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-4 md:gap-4">
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
          <BrowserMockup />
        </div>
      </div>

      <div className="relative w-full max-w-4xl">
        <h2 className="text-subtle mb-4 text-center font-mono text-base tracking-widest uppercase md:text-lg">
          What&apos;s covered
        </h2>
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

      {/* What's next — sneak peek */}
      <div className="relative mt-24 flex w-full max-w-4xl flex-col items-center text-center">
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

      <div className="relative mt-16 flex flex-col items-center gap-4 text-center">
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
