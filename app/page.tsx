import Link from "next/link";
import ConceptCard from "@/app/components/ConceptCard";
import { concepts } from "@/app/lib/concepts";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center text-center max-w-2xl">
        <span className="font-mono text-sm tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-6">
          frontend-101
        </span>

        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl leading-tight">
          Frontend Concepts,{" "}
          <span className="text-zinc-400 dark:text-zinc-500">Explained</span>
        </h1>

        <p className="mt-5 max-w-md text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Interactive, visual explanations of concepts every frontend developer
          runs into early on.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <a
            href="https://github.com/arBishal/Frontend-101"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Star on GitHub
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
            </svg>
          </a>
          <Link
            href="/concepts/responsiveness"
            className="inline-flex items-center gap-2 rounded bg-zinc-900 dark:bg-zinc-100 px-6 py-3 text-sm font-medium text-white dark:text-zinc-900 transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-300"
          >
            Explore the demos
            <span aria-hidden="true">&rarr;</span>
          </Link>
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
