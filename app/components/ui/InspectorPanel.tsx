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
        "w-full sm:w-1/3 shrink-0 rounded-lg bg-raised border border-default p-4 font-mono text-sm",
        className
      )}
    >
      <p className="text-xs uppercase tracking-widest text-subtle mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}
