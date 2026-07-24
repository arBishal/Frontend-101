type ConceptHeaderProps = {
  title: string;
  subtitle: string;
};

export default function ConceptHeader({ title, subtitle }: ConceptHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-strong text-2xl font-bold lg:text-3xl">{title}</h1>
      <p className="text-muted">{subtitle}</p>
    </div>
  );
}
