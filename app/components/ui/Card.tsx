import { twMerge } from "tailwind-merge";
import type { ComponentProps } from "react";

type CardProps = ComponentProps<"div">;

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        "rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
