// Decorative hero visual for the homepage. Two variants of the same browser
// chrome — a desktop dashboard and a portrait mobile browser.
export default function BrowserMockup({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  if (variant === "mobile") {
    return (
      <div
        className="border-default w-full max-w-3xs overflow-hidden rounded-2xl border"
        aria-hidden="true"
      >
        {/* Browser bar */}
        <div className="border-default flex items-center gap-2 border-b bg-zinc-100 px-3 py-2.5 dark:bg-zinc-900">
          <div className="size-3 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-5 flex-1 rounded-full bg-zinc-300 dark:bg-zinc-800" />
        </div>
        {/* Content */}
        <div className="bg-surface space-y-3 p-3">
          {/* Header */}
          <div className="space-y-2">
            <div className="h-3 w-24 rounded-full bg-zinc-400 dark:bg-zinc-700" />
            <div className="h-2 w-32 rounded-full bg-zinc-300 dark:bg-zinc-800" />
          </div>
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-raised border-default space-y-2 rounded-sm border p-3"
              >
                <div className="h-2 w-6 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <div className="h-3 w-10 rounded-full bg-zinc-400 dark:bg-zinc-700" />
              </div>
            ))}
          </div>
          {/* List */}
          <div className="bg-raised border-default overflow-hidden rounded-sm border">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="border-default flex items-center gap-3 border-t px-3 py-3 first:border-t-0"
              >
                <div className="size-6 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2 w-20 rounded-full bg-zinc-400 dark:bg-zinc-700" />
                  <div className="h-2 w-12 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom toolbar */}
        <div className="border-default flex items-center justify-evenly border-t bg-zinc-100 px-4 py-3 dark:bg-zinc-900">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="size-4 rounded-sm bg-zinc-300 dark:bg-zinc-700"
            />
          ))}
        </div>
      </div>
    );
  }

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
