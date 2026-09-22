"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { isStaffRole } from "@/lib/auth/roles";

export type LearnState = { error?: string; ok?: string };

export async function markLessonCompleteAction(
  _prev: LearnState,
  formData: FormData
): Promise<LearnState> {
  const user = await getCurrentUser();
  if (!user || isStaffRole(user.role)) {
    return { error: "Student sign-in required." };
  }

  const lessonId = String(formData.get("lessonId") || "");
  const courseSlug = String(formData.get("courseSlug") || "");
  if (!lessonId || !courseSlug) return { error: "Missing lesson." };

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseSlug: { userId: user.id, courseSlug },
    },
  });
  if (!enrollment || enrollment.status !== "active") {
    return { error: "You are not enrolled in this course." };
  }

  const lesson = await prisma.courseLesson.findFirst({
    where: { id: lessonId, courseSlug, published: true },
  });
  if (!lesson) return { error: "Lesson not found." };

  await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: { userId: user.id, lessonId },
    },
    update: { completed: true, completedAt: new Date() },
    create: {
      userId: user.id,
      lessonId,
      completed: true,
      completedAt: new Date(),
    },
  });

  revalidatePath(`/learn/${courseSlug}`);
  revalidatePath(`/learn/${courseSlug}/${lessonId}`);
  revalidatePath("/learn");
  return { ok: "Marked complete." };
}
