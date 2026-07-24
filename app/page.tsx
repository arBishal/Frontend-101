import { Star, MessageSquarePlus } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import { concepts } from "@/app/lib/concepts";

async function getStarCount(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/arBishal/Frontend-101",
      { next: { revalidate: 3600 } }
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
    <div className="w-full max-w-lg rounded-lg border border-default overflow-hidden" aria-hidden="true">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-default">
        <div className="flex gap-2">
          <div className="size-3 rounded-full bg-red-300 dark:bg-red-400/40" />
          <div className="size-3 rounded-full bg-yellow-300 dark:bg-yellow-400/40" />
          <div className="size-3 rounded-full bg-green-300 dark:bg-green-400/40" />
        </div>
        <div className="flex-1 h-5 rounded-xs bg-zinc-300 dark:bg-zinc-800 mx-8" />
      </div>
      {/* Content */}
      <div className="p-3 sm:p-4 bg-surface flex gap-3">
        {/* Sidebar */}
        <div className="w-10 sm:w-14 shrink-0 space-y-3 pt-1">
          <div className="h-2 w-8 sm:w-10 rounded-full bg-zinc-400 dark:bg-zinc-700" />
          <div className="h-2 w-6 sm:w-8 rounded-full bg-zinc-300 dark:bg-zinc-800" />
          <div className="h-2 w-7 sm:w-12 rounded-full bg-zinc-300 dark:bg-zinc-800" />
          <div className="h-2 w-5 sm:w-9 rounded-full bg-zinc-300 dark:bg-zinc-800" />
        </div>
        {/* Main */}
        <div className="flex-1 space-y-3 min-w-0">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-sm bg-raised border border-default p-2 sm:p-3 space-y-2"
              >
                <div className="h-2 w-6 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <div className="h-3 w-8 rounded-full bg-zinc-400 dark:bg-zinc-700" />
              </div>
            ))}
          </div>
          {/* Table */}
          <div className="rounded-sm bg-raised border border-default overflow-hidden">
            <div className="px-3 py-2 bg-inset dark:bg-inset/50 flex gap-4">
              <div className="h-2 w-12 rounded-full bg-zinc-400 dark:bg-zinc-700" />
              <div className="h-2 w-10 rounded-full bg-zinc-400 dark:bg-zinc-700 hidden sm:block" />
              <div className="h-2 w-8 rounded-full bg-zinc-400 dark:bg-zinc-700 ml-auto" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="px-3 py-2 flex gap-4 border-t border-default"
              >
                <div className="h-2 w-14 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <div className="h-2 w-10 rounded-full bg-zinc-300 dark:bg-zinc-800 hidden sm:block" />
                <div className="h-2 w-6 rounded-full bg-zinc-300 dark:bg-zinc-800 ml-auto" />
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
    <main className="min-h-screen flex flex-col items-center justify-center pt-4 pb-12 px-6 overflow-hidden">
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 dot-grid dark:dot-grid-dark"
        aria-hidden="true"
      />

      {/* hero */}
      <div className="h-dvh flex flex-col items-center justify-center text-center max-w-4xl gap-3 md:gap-4">
        <div className="animate-fade-in-up font-mono font-medium text-sm md:text-base inline-flex items-center gap-2">
          <span className="text-subtle">$</span>
          <span className="bg-linear-to-l from-zinc-600 to-zinc-500 dark:from-zinc-400 dark:to-zinc-500 bg-clip-text text-transparent">learn frontend-101</span>
        </div>

        <h1 className="animate-fade-in-up anim-delay-150 text-4xl font-bold text-strong md:text-5xl lg:text-7xl">
          Frontend Concepts,{" "}
          <span className="text-subtle">
            Explained
          </span>
        </h1>

        <p className="animate-fade-in-up anim-delay-300 max-w-md text-lg md:text-xl text-muted">
          Interactive, visual explanations of concepts every frontend developer
          runs into early on.
        </p>

        <div className="animate-fade-in-up anim-delay-450 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
          <Button variant="outline" href="https://github.com/arBishal/Frontend-101" className="justify-center group/star">
            {stars !== null && (
              <span className=" tabular-nums text-subtle">
                {stars}
              </span>
            )}
            <Star className="size-4 transition-colors group-hover/star:text-yellow-400 group-hover/star:fill-yellow-400" />
            on GitHub
          </Button>
          <Button href={`/concepts/${concepts[0].slug}`} className="justify-center order-first sm:order-0">
            Explore the demos
            <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
      {/* Hero visual */}
      <div className="animate-fade-in-up anim-delay-600 relative w-full flex justify-center mt-8 md:mt-12">
        <BrowserMockup />
      </div>
      </div>


      <div className="relative w-full max-w-4xl">
        <h2 className="font-mono text-base md:text-lg text-subtle mb-4 text-center uppercase tracking-widest">
          What&apos;s covered
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {concepts.map((concept) => {
            const Icon = concept.icon;
            return (
              <Card
                key={concept.slug}
                href={`/concepts/${concept.slug}`}
                className="group p-6 transition hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-1">
                  <Icon className="size-4 md:size-5 text-subtle group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                  <h3 className="font-medium text-base md:text-lg text-strong group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors">
                    {concept.title}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted">
                  {concept.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* What's next — sneak peek */}
      <div className="relative w-full max-w-4xl mt-24 flex flex-col items-center text-center">
        <h2 className="font-mono text-base md:text-lg text-subtle mb-4 uppercase tracking-widest">
          What&apos;s next
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-strong">
          How to Approach a Component
        </h3>
        <p className="mt-2 text-base md:text-lg text-muted max-w-md">
          Breaking down real UI challenges.
        </p>

        {/* Autocomplete mockup */}
        <div className="mt-8 w-full max-w-sm" aria-hidden="true">
          <div className="rounded-lg border border-default overflow-hidden">
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 bg-surface">
              <div className="size-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600" />
              <div className="h-3 w-24 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700 ml-auto" />
            </div>
            {/* Suggestion rows */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-2.5 border-t border-zinc-100 dark:border-zinc-800/60 ${i === 1 ? "bg-raised" : "bg-surface"}`}
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

        <span className="mt-6 inline-block rounded-full border border-default px-4 py-1.5 text-xs font-medium text-subtle uppercase tracking-wider">
          Coming soon
        </span>
      </div>

      <div className="relative mt-16 flex flex-col items-center gap-4 text-center">
        <p className="text-sm md:text-base text-muted">
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
