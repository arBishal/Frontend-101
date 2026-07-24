import { cn } from "@/app/lib/cn";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionLabel({
  children,
  className,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-mono font-medium tracking-wide text-zinc-600 uppercase dark:text-zinc-300",
        className,
      )}
    >
      {children}
    </p>
  );
}
