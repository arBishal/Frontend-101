import { Monitor, Tablet, Smartphone } from "lucide-react";

export default function ResponsivenessPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Responsive Design
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Responsive layouts adapt to the screen size. Resize your browser window
          and watch everything change in real time.
        </p>
      </div>

      {/* Breakpoint indicator — pure CSS, no JS */}
      <div>
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-400 dark:text-zinc-500 mb-4">
          Current breakpoint
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Mobile — active below sm */}
          <div className="rounded-lg border p-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 border-zinc-400 dark:border-zinc-500 bg-zinc-100 dark:bg-zinc-800 sm:border-zinc-200 sm:dark:border-zinc-800 sm:bg-transparent sm:dark:bg-transparent">
            <Smartphone className="size-6 shrink-0 text-zinc-700 dark:text-zinc-200 sm:text-zinc-300 sm:dark:text-zinc-600" />
            <div className="text-center sm:text-left">
              <p className="font-mono text-sm font-medium text-zinc-700 dark:text-zinc-200 sm:text-zinc-400 sm:dark:text-zinc-500">mobile</p>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 sm:text-zinc-300 sm:dark:text-zinc-700">&lt; 640px</p>
            </div>
          </div>

          {/* Tablet — active from sm to lg */}
          <div className="rounded-lg border p-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 border-zinc-200 dark:border-zinc-800 sm:border-zinc-400 sm:dark:border-zinc-500 sm:bg-zinc-100 sm:dark:bg-zinc-800 lg:border-zinc-200 lg:dark:border-zinc-800 lg:bg-transparent lg:dark:bg-transparent">
            <Tablet className="size-6 shrink-0 text-zinc-300 dark:text-zinc-600 sm:text-zinc-700 sm:dark:text-zinc-200 lg:text-zinc-300 lg:dark:text-zinc-600" />
            <div className="text-center sm:text-left">
              <p className="font-mono text-sm font-medium text-zinc-400 dark:text-zinc-500 sm:text-zinc-700 sm:dark:text-zinc-200 lg:text-zinc-400 lg:dark:text-zinc-500">tablet</p>
              <p className="font-mono text-xs text-zinc-300 dark:text-zinc-700 sm:text-zinc-500 sm:dark:text-zinc-400 lg:text-zinc-300 lg:dark:text-zinc-700">640px - 1023px</p>
            </div>
          </div>

          {/* Desktop — active from lg */}
          <div className="rounded-lg border p-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 border-zinc-200 dark:border-zinc-800 lg:border-zinc-400 lg:dark:border-zinc-500 lg:bg-zinc-100 lg:dark:bg-zinc-800">
            <Monitor className="size-6 shrink-0 text-zinc-300 dark:text-zinc-600 lg:text-zinc-700 lg:dark:text-zinc-200" />
            <div className="text-center sm:text-left">
              <p className="font-mono text-sm font-medium text-zinc-400 dark:text-zinc-500 lg:text-zinc-700 lg:dark:text-zinc-200">desktop</p>
              <p className="font-mono text-xs text-zinc-300 dark:text-zinc-700 lg:text-zinc-500 lg:dark:text-zinc-400">1024px+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample layout demo */}
      <div className="text-sm lg:text-base">
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-400 dark:text-zinc-500 mb-4">
          Sample layout
        </p>

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 space-y-4">
          {/* Mock navbar */}
          <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-5 py-4 flex items-center justify-between">
            <div className="size-6 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0" />
            <div className="hidden sm:flex gap-3">
              <div className="h-2.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="h-2.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="h-2.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <div className="sm:hidden space-y-1">
              <div className="h-0.5 w-4 bg-zinc-400 dark:bg-zinc-500" />
              <div className="h-0.5 w-4 bg-zinc-400 dark:bg-zinc-500" />
              <div className="h-0.5 w-4 bg-zinc-400 dark:bg-zinc-500" />
            </div>
          </div>

          {/* Mock hero */}
          <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 px-6 py-10 text-center space-y-3">
            <div className="h-4 w-1/3 mx-auto rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-2.5 w-2/3 mx-auto rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-2.5 w-1/2 mx-auto rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>

          {/* Mock cards — responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-5 space-y-3">
                <div className="h-3 w-16 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
            ))}
          </div>

          {/* Mock footer */}
          <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="h-2.5 w-20 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex gap-3">
              <div className="h-2.5 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="h-2.5 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="h-2.5 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-400 dark:text-zinc-500">
          How it works
        </p>
        <p>
          CSS breakpoints let you apply different styles based on the viewport
          width. The sample layout above uses three breakpoints:
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li><strong>mobile</strong> — single column, nav links collapse to hamburger icon</li>
          <li><strong>tablet</strong> (640px+) — two-column card grid, nav links visible</li>
          <li><strong>desktop</strong> (1024px+) — three-column card grid</li>
        </ul>
        <p>
          Resize the browser to see the layout shift between these breakpoints.
          The indicator above highlights which breakpoint is currently active — using only CSS, no JavaScript.
        </p>
      </div>
    </div>
  );
}
