import SectionLabel from "@/app/components/ui/SectionLabel";

type TakeawayProps = {
  children: React.ReactNode;
};

export default function Takeaway({ children }: TakeawayProps) {
  return (
    <div className="border-default rounded-lg border p-5 sm:p-6">
      <SectionLabel className="text-xs text-emerald-700 lg:text-sm dark:text-emerald-500">
        If you remember one thing
      </SectionLabel>
      <p className="text-body mt-2">{children}</p>
    </div>
  );
}
