export default function ConceptLoading() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {/* Title + description */}
      <div className="space-y-3">
        <div className="h-8 w-48 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-72 rounded-full bg-zinc-100 dark:bg-zinc-800/60" />
      </div>

      {/* Section label + demo card */}
      <div className="flex flex-col gap-4">
        <div className="h-3 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 space-y-3">
          <div className="h-4 w-full rounded-full bg-zinc-100 dark:bg-zinc-800/60" />
          <div className="h-4 w-5/6 rounded-full bg-zinc-100 dark:bg-zinc-800/60" />
          <div className="h-4 w-4/6 rounded-full bg-zinc-100 dark:bg-zinc-800/60" />
        </div>
      </div>

      {/* Section label + prose lines */}
      <div className="flex flex-col gap-3">
        <div className="h-3 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-2">
          <div className="h-3.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800/60" />
          <div className="h-3.5 w-11/12 rounded-full bg-zinc-100 dark:bg-zinc-800/60" />
          <div className="h-3.5 w-4/5 rounded-full bg-zinc-100 dark:bg-zinc-800/60" />
          <div className="h-3.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800/60" />
          <div className="h-3.5 w-3/4 rounded-full bg-zinc-100 dark:bg-zinc-800/60" />
        </div>
      </div>
    </div>
  );
}
