import { twMerge } from "tailwind-merge";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p className={twMerge("font-mono uppercase tracking-wide font-medium text-zinc-500 dark:text-zinc-300", className)}>
      {children}
    </p>
  );
}
