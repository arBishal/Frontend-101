import { twMerge } from "tailwind-merge";

type InspectorPanelProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function InspectorPanel({ title, children, className }: InspectorPanelProps) {
  return (
    <div
      className={twMerge(
        "w-full sm:w-1/3 shrink-0 rounded-lg bg-zinc-900 dark:bg-zinc-800 p-4 font-mono text-sm",
        className
      )}
    >
      <p className="text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}
