import { cn } from "@/app/lib/cn";

type InspectorPanelProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function InspectorPanel({ title, children, className }: InspectorPanelProps) {
  return (
    <div
      className={cn(
        "w-full sm:w-1/3 shrink-0 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 font-mono text-sm",
        className
      )}
    >
      <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}
