import { cn } from "@/app/lib/cn";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p className={cn("font-mono uppercase tracking-wide font-medium text-zinc-600 dark:text-zinc-300", className)}>
      {children}
    </p>
  );
}
