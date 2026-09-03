import type { Offering } from "@/types/offering";

export function Curriculum({ offering }: { offering: Offering }) {
  if (offering.modules.length === 0) return null;
  return (
    <ol className="space-y-4">
      {offering.modules.map((module, index) => (
        <li key={module.id} className="rounded-xl border border-border bg-white p-5">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Module {index + 1}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{module.title}</h3>
          <ul className="text-muted-foreground mt-3 list-disc space-y-1 pl-5">
            {module.lessons.map((lesson) => (
              <li key={lesson}>{lesson}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
