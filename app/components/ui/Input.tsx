import type { ComponentProps } from "react";
import { cn } from "@/app/lib/cn";

const base =
  "bg-zinc-100 dark:bg-zinc-900 text-sm text-strong px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-zinc-500";

export default function Input({
  className,
  ...props
}: ComponentProps<"input">) {
  return <input className={cn(base, className)} {...props} />;
}
