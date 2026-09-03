import { CourseCard } from "@/components/course/CourseCard";
import type { Offering } from "@/types/offering";

export function CourseGrid({ offerings }: { offerings: Offering[] }) {
  if (offerings.length === 0) {
    return <p className="text-muted-foreground">No programmes in this group yet.</p>;
  }
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {offerings.map((offering) => (
        <li key={offering.id}>
          <CourseCard offering={offering} />
        </li>
      ))}
    </ul>
  );
}
