import { prisma } from "@/lib/db";
import { offerings } from "@/data/offerings";

export async function getSiteSettingsMap() {
  const rows = await prisma.siteSetting.findMany();
  return Object.fromEntries(rows.map((row) => [row.key, row.value])) as Record<
    string,
    string
  >;
}

export function offeringBySlug(slug: string) {
  return offerings.find((item) => item.slug === slug) ?? null;
}

export async function getStudentCourseProgress(userId: string, courseSlug: string) {
  const lessons = await prisma.courseLesson.findMany({
    where: { courseSlug, published: true },
    orderBy: { sortOrder: "asc" },
  });
  const progress = await prisma.lessonProgress.findMany({
    where: {
      userId,
      lessonId: { in: lessons.map((l) => l.id) },
      completed: true,
    },
  });
  const completed = progress.length;
  const total = lessons.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { lessons, completed, total, percent };
}

export function toEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}?rel=0`;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}?rel=0`;
      if (parsed.pathname.startsWith("/embed/")) return url;
    }
  } catch {
    /* keep original */
  }
  return url;
}
