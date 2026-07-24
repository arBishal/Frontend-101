import { cn } from "@/app/lib/cn";

type InspectorPanelProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function InspectorPanel({
  title,
  children,
  className,
}: InspectorPanelProps) {
  return (
    <div
      className={cn(
        "bg-raised border-default w-full shrink-0 rounded-lg border p-4 font-mono text-sm sm:w-1/3",
        className,
      )}
    >
      <p className="text-subtle mb-3 text-xs tracking-widest uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}
