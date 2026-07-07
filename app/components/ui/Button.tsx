import Link from "next/link";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

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

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  href?: never;
};

type AnchorProps = ComponentProps<"a"> & {
  variant?: Variant;
  href: string;
};

type Props = ButtonProps | AnchorProps;

export default function Button({ variant = "solid", className = "", ...props }: Props) {
  const classes = twMerge(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as AnchorProps;
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        />
      );
    }

    return <Link href={href} className={classes} {...rest} />;
  }

  return <button className={classes} {...(props as ButtonProps)} />;
}
