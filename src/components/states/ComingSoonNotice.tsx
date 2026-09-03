export function ComingSoonNotice({
  title = "Coming soon",
  description,
}: {
  title?: string;
  description: string;
}) {
  return (
    <aside
      className="rounded-xl border border-border bg-white p-5"
      aria-live="polite"
    >
      <p className="bg-secondary text-navy inline-flex rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide uppercase">
        Coming soon
      </p>
      <h2 className="mt-3 text-xl font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>
    </aside>
  );
}
