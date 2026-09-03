export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-8 text-center">
      <p className="font-heading text-lg font-semibold">{title}</p>
      <p className="text-muted-foreground mt-2 text-sm">{body}</p>
    </div>
  );
}

export function ErrorState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-destructive/30 rounded-xl border bg-white p-8 text-center" role="alert">
      <p className="font-heading text-lg font-semibold">{title}</p>
      <p className="text-muted-foreground mt-2 text-sm">{body}</p>
    </div>
  );
}
