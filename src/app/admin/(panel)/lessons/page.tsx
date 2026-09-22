import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { offerings } from "@/data/offerings";
import { DeleteLessonButton, LessonEditor } from "@/components/admin/LessonForms";
import { offeringBySlug } from "@/lib/learning/queries";

export const metadata: Metadata = {
  title: "Video lessons · Administration",
  robots: { index: false, follow: false },
};

export default async function AdminLessonsPage() {
  const lessons = await prisma.courseLesson.findMany({
    orderBy: [{ courseSlug: "asc" }, { sortOrder: "asc" }],
  });
  const courses = offerings
    .filter((o) => o.category === "paid" || o.category === "free")
    .map((o) => ({ slug: o.slug, title: o.title }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Video lessons</h1>
        <p className="text-muted-foreground mt-2">
          Attach video modules to catalogue courses. Students only see published lessons for courses
          they are enrolled in.
        </p>
      </div>
      <LessonEditor courses={courses} />
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="grid gap-4 rounded-xl border border-border bg-white p-5 lg:grid-cols-[1fr_auto]"
          >
            <div>
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                {offeringBySlug(lesson.courseSlug)?.title ?? lesson.courseSlug} · {lesson.moduleTitle}
              </p>
              <h3 className="font-heading mt-1 text-lg font-semibold text-navy">{lesson.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{lesson.description || "No description"}</p>
              <p className="mt-2 text-xs">
                Order {lesson.sortOrder} · {lesson.durationMin} min ·{" "}
                {lesson.published ? "Published" : "Draft"}
              </p>
              <p className="text-muted-foreground mt-1 truncate text-xs">{lesson.videoUrl}</p>
            </div>
            <div className="flex flex-col gap-2">
              <DeleteLessonButton id={lesson.id} />
            </div>
            <div className="lg:col-span-2">
              <LessonEditor courses={courses} lesson={lesson} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
