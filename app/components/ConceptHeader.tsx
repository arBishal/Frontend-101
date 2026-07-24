type ConceptHeaderProps = {
  title: string;
  subtitle: string;
};

export default function ConceptHeader({ title, subtitle }: ConceptHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl lg:text-3xl font-bold text-strong">
        {title}
      </h1>
      <p className="text-muted">{subtitle}</p>
    </div>
  );
}
