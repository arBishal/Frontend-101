import Link from "next/link";
import { twMerge } from "tailwind-merge";
import type { ComponentProps } from "react";

type CardProps = ComponentProps<"div"> & { href?: string };

const base = "rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6";

export default function Card({ href, className, children, ...props }: CardProps) {
  const classes = twMerge(base, className);

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

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
