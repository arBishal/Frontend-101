import type { LucideIcon } from "lucide-react";
import Card from "@/app/components/ui/Card";
import { cn } from "@/app/lib/cn";

export type Problem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type ProblemCardsProps = {
  problems: Problem[];
  /** Override the default 3-column grid, e.g. "sm:grid-cols-2 gap-4". */
  className?: string;
};

export default function ProblemCards({ problems, className }: ProblemCardsProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-3 !mt-4", className)}>
      {problems.map(({ icon: Icon, title, description }) => (
        <Card key={title} className="space-y-2 sm:p-5">
          <div className="flex items-center gap-2.5">
            <Icon className="size-4 text-subtle shrink-0" />
            <p className="font-medium text-strong">{title}</p>
          </div>
          <p className="text-subtle text-sm">{description}</p>
        </Card>
      ))}
    </div>
  );
}
