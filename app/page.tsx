import { Star } from "lucide-react";
import Button from "@/app/components/ui/Button";
import ConceptCard from "@/app/components/ConceptCard";
import { concepts } from "@/app/lib/concepts";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center text-center max-w-2xl">
        <div className="font-mono text-sm mb-6 inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <span className="text-zinc-400 dark:text-zinc-500">$</span>
          <span>npx frontend-101</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl lg:6xl leading-tight">
          Frontend Concepts,{" "}
          <span className="text-zinc-400 dark:text-zinc-500">Explained</span>
        </h1>

        <p className="mt-5 max-w-md text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Interactive, visual explanations of concepts every frontend developer
          runs into early on.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Button variant="outline" href="https://github.com/arBishal/Frontend-101">
            Star on GitHub
            <Star className="size-4" />
          </Button>
          <Button href="/concepts/responsiveness">
            Explore the demos
            <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
      </div>

      <div className="mt-20 w-full max-w-3xl">
        <p className="font-mono text-xs text-zinc-400 dark:text-zinc-600 mb-4 text-center uppercase tracking-widest">
          What&apos;s covered
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {concepts.map((concept) => (
            <ConceptCard key={concept.slug} concept={concept} />
          ))}
        </div>
      </div>
    </main>
  );
}
