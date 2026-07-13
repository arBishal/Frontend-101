import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/app/lib/cn";

const variants = {
  solid:
    "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300",
  outline:
    "border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800",
  ghost:
    "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100",
} as const;

const base =
  "inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-medium transition-colors";

type Variant = keyof typeof variants;

type Props = ComponentProps<"button"> & {
  variant?: Variant;
  href?: string;
};

export default function Button({ variant = "solid", className = "", href, children, ...rest }: Props) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return <button className={classes} {...rest}>{children}</button>;
}
