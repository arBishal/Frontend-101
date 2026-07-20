type ConceptHeaderProps = {
  title: string;
  subtitle: string;
};

export default function ConceptHeader({ title, subtitle }: ConceptHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">{subtitle}</p>
    </div>
  );
}
