import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="animate-fade-up max-w-3xl space-y-3">
      {eyebrow ? (
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
      {description ? (
        <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl space-y-3 text-center", className)}>
      {eyebrow ? (
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
      {description ? (
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
