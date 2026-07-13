import type { ComponentProps } from "react";
import { cn } from "@/app/lib/cn";

const base =
  "bg-zinc-100 dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-50 px-3 py-2 rounded border border-zinc-300 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-500 outline-none transition-colors";

export default function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(base, className)} {...props} />;
}
