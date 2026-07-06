import type { Concept } from "@/app/lib/concepts";

export default function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <div className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 transition-all hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 hover:shadow-sm">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors">
        {concept.title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {concept.description}
      </p>
    </div>
  );
}
