export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
        {eyebrow}
      </p>
      <Heading className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
