import SectionLabel from "@/app/components/ui/SectionLabel";

type TakeawayProps = {
  children: React.ReactNode;
};

export default function Takeaway({ children }: TakeawayProps) {
  return (
    <div className="rounded-lg border border-default p-5 sm:p-6">
      <SectionLabel className="text-xs lg:text-sm text-emerald-700 dark:text-emerald-500">
        If you remember one thing
      </SectionLabel>
      <p className="mt-2 text-body">{children}</p>
    </div>
  );
}
