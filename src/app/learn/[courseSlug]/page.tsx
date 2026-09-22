import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { getCurrentUser } from "@/lib/auth/session";
import { isStaffRole } from "@/lib/auth/roles";
import { prisma } from "@/lib/db";
import { getStudentCourseProgress, offeringBySlug } from "@/lib/learning/queries";

type Props = { params: Promise<{ courseSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params;
  const offering = offeringBySlug(courseSlug);
  return {
    title: offering ? `${offering.title} · Learning` : "Course",
    robots: { index: false, follow: false },
  };
}

export default async function LearnCoursePage({ params }: Props) {
  const { courseSlug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=/learn/${courseSlug}`);
  if (isStaffRole(user.role)) redirect("/admin");

  const offering = offeringBySlug(courseSlug);
  if (!offering) notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseSlug: { userId: user.id, courseSlug } },
  });
  if (!enrollment || enrollment.status !== "active") {
    redirect("/learn");
  }

  const progress = await getStudentCourseProgress(user.id, courseSlug);
  const completedIds = new Set(
    (
      await prisma.lessonProgress.findMany({
        where: {
          userId: user.id,
          lessonId: { in: progress.lessons.map((l) => l.id) },
          completed: true,
        },
        select: { lessonId: true },
      })
    ).map((row) => row.lessonId)
  );

  const modules = new Map<string, typeof progress.lessons>();
  for (const lesson of progress.lessons) {
    const list = modules.get(lesson.moduleTitle) ?? [];
    list.push(lesson);
    modules.set(lesson.moduleTitle, list);
  }

  return (
    <div className="py-12 sm:py-16">
      <Container className="space-y-8">
        <div>
          <Link href="/learn" className="text-primary text-sm font-medium">
            ← My learning
          </Link>
          <PageHeader
            className="mt-3"
            eyebrow="Video modules"
            title={offering.title}
            description={`${progress.completed} of ${progress.total} lessons complete (${progress.percent}%).`}
          />
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-green" style={{ width: `${progress.percent}%` }} />
        </div>

        {progress.lessons.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-white p-6 text-sm">
            No published video lessons yet. Ask a Moderator to add modules for this course.
          </p>
        ) : (
          <div className="space-y-6">
            {[...modules.entries()].map(([moduleTitle, lessons]) => (
              <section key={moduleTitle} className="rounded-xl border border-border bg-white p-5">
                <h2 className="font-heading text-lg font-semibold text-navy">{moduleTitle}</h2>
                <ul className="mt-4 space-y-2">
                  {lessons.map((lesson) => {
                    const done = completedIds.has(lesson.id);
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={`/learn/${courseSlug}/${lesson.id}`}
                          className="hover:bg-secondary flex items-center justify-between gap-3 rounded-md px-3 py-3 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-navy">{lesson.title}</p>
                            <p className="text-muted-foreground text-xs">
                              {lesson.durationMin} min
                              {done ? " · Completed" : ""}
                            </p>
                          </div>
                          <span className="text-primary text-sm font-medium">
                            {done ? "Review" : "Watch"}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
