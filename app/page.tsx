import { Star } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import ThemeToggle from "@/app/components/ThemeToggle";
import { concepts } from "@/app/lib/concepts";

function BrowserMockup() {
  return (
    <div className="w-full max-w-lg rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex gap-2">
          <div className="size-3 rounded-full bg-red-300 dark:bg-red-400/40" />
          <div className="size-3 rounded-full bg-yellow-300 dark:bg-yellow-400/40" />
          <div className="size-3 rounded-full bg-green-300 dark:bg-green-400/40" />
        </div>
        <div className="flex-1 h-5 rounded-xs bg-zinc-300 dark:bg-zinc-800 mx-8" />
      </div>
      {/* Content */}
      <div className="p-3 sm:p-4 bg-white dark:bg-zinc-950 flex gap-3">
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
                className="rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 sm:p-3 space-y-2"
              >
                <div className="h-2 w-6 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <div className="h-3 w-8 rounded-full bg-zinc-400 dark:bg-zinc-700" />
              </div>
            ))}
          </div>
          {/* Table */}
          <div className="rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800/50 flex gap-4">
              <div className="h-2 w-12 rounded-full bg-zinc-400 dark:bg-zinc-700" />
              <div className="h-2 w-10 rounded-full bg-zinc-400 dark:bg-zinc-700 hidden sm:block" />
              <div className="h-2 w-8 rounded-full bg-zinc-400 dark:bg-zinc-700 ml-auto" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="px-3 py-2 flex gap-4 border-t border-zinc-200 dark:border-zinc-800"
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

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)]"
        aria-hidden="true"
      />

      {/* hero */}
      <div className="h-dvh flex flex-col items-center justify-center text-center max-w-4xl gap-3 md:gap-4">
        <div className="animate-fade-in-up font-mono text-sm md:text-base inline-flex items-center gap-2">
          <span className="text-zinc-500 dark:text-zinc-400">$</span>
          <span className="bg-linear-to-r from-zinc-600 to-zinc-500 dark:from-zinc-400 dark:to-zinc-500 bg-clip-text text-transparent">npx frontend-101</span>
        </div>

        <h1 className="animate-fade-in-up anim-delay-150 text-4xl font-bold text-zinc-900 dark:text-zinc-50 md:text-5xl lg:text-7xl">
          Frontend Concepts,{" "}
          <span className="text-zinc-500 dark:text-zinc-400">
            Explained
          </span>
        </h1>

        <p className="animate-fade-in-up anim-delay-300 max-w-md text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
          Interactive, visual explanations of concepts every frontend developer
          runs into early on.
        </p>

        <div className="animate-fade-in-up anim-delay-450 flex flex-col sm:flex-row items-stretch gap-4 mt-3 md:mt-4">
          <Button variant="outline" href="https://github.com/arBishal/Frontend-101" className="justify-center group/star">
            Star on GitHub
            <Star className="size-4 transition-colors group-hover/star:text-yellow-400 group-hover/star:fill-yellow-400" />
          </Button>
          <Button href="/concepts/responsiveness" className="justify-center">
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
        <h2 className="font-mono text-base md:text-lg text-zinc-500 mb-4 text-center uppercase tracking-widest">
          What&apos;s covered
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {concepts.map((concept) => {
            const Icon = concept.icon;
            return (
              <Card
                key={concept.slug}
                href={`/concepts/${concept.slug}`}
                className="group p-6 transition-all hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-1">
                  <Icon className="size-4 md:size-5 text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                  <h3 className="font-medium text-base md:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors">
                    {concept.title}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                  {concept.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* What's next — sneak peek */}
      <div className="relative w-full max-w-4xl mt-24 flex flex-col items-center text-center">
        <p className="font-mono text-base md:text-lg text-zinc-500 mb-4 uppercase tracking-widest">
          What&apos;s next
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          How to Approach a Component
        </h2>
        <p className="mt-2 text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
          Breaking down real UI challenges.
        </p>

        {/* Autocomplete mockup */}
        <div className="mt-8 w-full max-w-sm">
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-zinc-950">
              <div className="size-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600" />
              <div className="h-3 w-24 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700 ml-auto" />
            </div>
            {/* Suggestion rows */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-2.5 border-t border-zinc-100 dark:border-zinc-800/60 ${i === 1 ? "bg-zinc-50 dark:bg-zinc-900" : "bg-white dark:bg-zinc-950"}`}
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

        <span className="mt-6 inline-block rounded-full border border-zinc-200 dark:border-zinc-800 px-4 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Coming soon
        </span>
      </div>

      <div className="relative mt-16 text-center text-sm md:text-base text-zinc-600 dark:text-zinc-400">
        <p>
          Have a suggestion or found something to improve?{" "}
          <a
            href="https://github.com/arBishal/Frontend-101/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Open an issue on GitHub
          </a>
        </p>
      </div>

      <ThemeToggle />
    </main>
  );
}
