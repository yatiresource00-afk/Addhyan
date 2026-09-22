import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { MarkCompleteButton } from "@/components/learning/MarkCompleteButton";
import { getCurrentUser } from "@/lib/auth/session";
import { isStaffRole } from "@/lib/auth/roles";
import { prisma } from "@/lib/db";
import { offeringBySlug, toEmbedUrl } from "@/lib/learning/queries";

type Props = { params: Promise<{ courseSlug: string; lessonId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = await prisma.courseLesson.findUnique({ where: { id: lessonId } });
  return {
    title: lesson ? `${lesson.title} · Learning` : "Lesson",
    robots: { index: false, follow: false },
  };
}

export default async function LearnLessonPage({ params }: Props) {
  const { courseSlug, lessonId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=/learn/${courseSlug}/${lessonId}`);
  if (isStaffRole(user.role)) redirect("/admin");

  const offering = offeringBySlug(courseSlug);
  if (!offering) notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseSlug: { userId: user.id, courseSlug } },
  });
  if (!enrollment || enrollment.status !== "active") redirect("/learn");

  const lesson = await prisma.courseLesson.findFirst({
    where: { id: lessonId, courseSlug, published: true },
  });
  if (!lesson) notFound();

  const progress = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId: user.id, lessonId } },
  });

  const siblings = await prisma.courseLesson.findMany({
    where: { courseSlug, published: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true },
  });
  const index = siblings.findIndex((item) => item.id === lessonId);
  const prev = index > 0 ? siblings[index - 1] : null;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;

  const embed = toEmbedUrl(lesson.videoUrl);

  return (
    <div className="py-10 sm:py-14">
      <Container className="space-y-6">
        <div>
          <Link href={`/learn/${courseSlug}`} className="text-primary text-sm font-medium">
            ← {offering.title}
          </Link>
          <p className="text-muted-foreground mt-3 text-xs tracking-wide uppercase">
            {lesson.moduleTitle}
          </p>
          <h1 className="font-heading mt-1 text-3xl font-semibold text-navy">{lesson.title}</h1>
          {lesson.description ? (
            <p className="text-muted-foreground mt-2 max-w-3xl">{lesson.description}</p>
          ) : null}
        </div>

        <div className="aspect-video overflow-hidden rounded-xl border border-border bg-black">
          <iframe
            title={lesson.title}
            src={embed}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <MarkCompleteButton
            lessonId={lesson.id}
            courseSlug={courseSlug}
            completed={Boolean(progress?.completed)}
          />
          <div className="flex gap-3 text-sm">
            {prev ? (
              <Link href={`/learn/${courseSlug}/${prev.id}`} className="text-primary font-medium">
                Previous
              </Link>
            ) : null}
            {next ? (
              <Link href={`/learn/${courseSlug}/${next.id}`} className="text-primary font-medium">
                Next lesson
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}
