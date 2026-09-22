"use server";

import { revalidatePath } from "next/cache";
import type { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireStaff } from "@/lib/auth/session";
import { hashPassword } from "@/lib/auth/password";
import { isDirector, isStaffRole } from "@/lib/auth/roles";
import { normalizeEmail, normalizePhone } from "@/lib/auth/otp";
import { offerings } from "@/data/offerings";

export type AdminState = { error?: string; ok?: string };

async function staffOrError() {
  const user = await requireStaff();
  if (!user) return { error: "Administration access required." } as const;
  return { user } as const;
}

export async function createUserAction(
  _prev: AdminState,
  formData: FormData
): Promise<AdminState> {
  const gate = await staffOrError();
  if ("error" in gate) return gate;

  const name = String(formData.get("name") || "").trim();
  const email = normalizeEmail(String(formData.get("email") || ""));
  const phoneRaw = String(formData.get("phone") || "").trim();
  const phone = phoneRaw ? normalizePhone(phoneRaw) : null;
  const password = String(formData.get("password") || "");
  const role = String(formData.get("role") || "STUDENT") as Role;

  if (name.length < 2) return { error: "Enter a name." };
  if (!email.includes("@")) return { error: "Enter a valid email." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (!["STUDENT", "MODERATOR", "DIRECTOR"].includes(role)) {
    return { error: "Invalid role." };
  }
  if (role !== "STUDENT" && !isDirector(gate.user.role)) {
    return { error: "Only Directors can create Moderator or Director accounts." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "Email already registered." };
  if (phone) {
    const taken = await prisma.user.findUnique({ where: { phone } });
    if (taken) return { error: "WhatsApp number already registered." };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      phone,
      role,
      passwordHash: await hashPassword(password),
    },
  });
  revalidatePath("/admin/users");
  return { ok: "User created." };
}

export async function updateUserRoleAction(
  _prev: AdminState,
  formData: FormData
): Promise<AdminState> {
  const gate = await staffOrError();
  if ("error" in gate) return gate;
  if (!isDirector(gate.user.role)) {
    return { error: "Only Directors can change roles." };
  }

  const userId = String(formData.get("userId") || "");
  const role = String(formData.get("role") || "") as Role;
  if (!userId || !["STUDENT", "MODERATOR", "DIRECTOR"].includes(role)) {
    return { error: "Invalid role update." };
  }
  if (userId === gate.user.id && role === "STUDENT") {
    return { error: "You cannot demote your own Director account." };
  }

  await prisma.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/admin/users");
  return { ok: "Role updated." };
}

export async function enrollStudentAction(
  _prev: AdminState,
  formData: FormData
): Promise<AdminState> {
  const gate = await staffOrError();
  if ("error" in gate) return gate;

  const userId = String(formData.get("userId") || "");
  const courseSlug = String(formData.get("courseSlug") || "");
  const known = offerings.some((o) => o.slug === courseSlug);
  if (!userId || !known) return { error: "Select a student and a valid course." };

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || isStaffRole(user.role)) {
    return { error: "Enrolments are for student accounts." };
  }

  await prisma.enrollment.upsert({
    where: { userId_courseSlug: { userId, courseSlug } },
    update: { status: "active" },
    create: { userId, courseSlug, status: "active" },
  });
  revalidatePath("/admin/enrollments");
  revalidatePath("/learn");
  return { ok: "Student enrolled." };
}

export async function revokeEnrollmentAction(
  _prev: AdminState,
  formData: FormData
): Promise<AdminState> {
  const gate = await staffOrError();
  if ("error" in gate) return gate;
  const id = String(formData.get("enrollmentId") || "");
  if (!id) return { error: "Missing enrolment." };
  await prisma.enrollment.delete({ where: { id } });
  revalidatePath("/admin/enrollments");
  revalidatePath("/learn");
  return { ok: "Enrolment removed." };
}

export async function upsertLessonAction(
  _prev: AdminState,
  formData: FormData
): Promise<AdminState> {
  const gate = await staffOrError();
  if ("error" in gate) return gate;

  const id = String(formData.get("id") || "");
  const courseSlug = String(formData.get("courseSlug") || "").trim();
  const moduleTitle = String(formData.get("moduleTitle") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const videoUrl = String(formData.get("videoUrl") || "").trim();
  const durationMin = Number(formData.get("durationMin") || 10);
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const published = formData.get("published") === "on";

  if (!courseSlug || !moduleTitle || !title || !videoUrl) {
    return { error: "Course, module, title and video URL are required." };
  }
  if (!offerings.some((o) => o.slug === courseSlug)) {
    return { error: "Unknown course slug." };
  }

  const data = {
    courseSlug,
    moduleTitle,
    title,
    description,
    videoUrl,
    durationMin: Number.isFinite(durationMin) ? durationMin : 10,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    published,
  };

  if (id) {
    await prisma.courseLesson.update({ where: { id }, data });
  } else {
    await prisma.courseLesson.create({ data });
  }

  revalidatePath("/admin/lessons");
  revalidatePath("/learn");
  return { ok: id ? "Lesson updated." : "Lesson created." };
}

export async function deleteLessonAction(
  _prev: AdminState,
  formData: FormData
): Promise<AdminState> {
  const gate = await staffOrError();
  if ("error" in gate) return gate;
  const id = String(formData.get("id") || "");
  if (!id) return { error: "Missing lesson." };
  await prisma.courseLesson.delete({ where: { id } });
  revalidatePath("/admin/lessons");
  revalidatePath("/learn");
  return { ok: "Lesson deleted." };
}

export async function saveSiteSettingsAction(
  _prev: AdminState,
  formData: FormData
): Promise<AdminState> {
  const gate = await staffOrError();
  if ("error" in gate) return gate;

  const keys = [
    "contact_email",
    "contact_phone",
    "contact_address",
    "announcement",
    "site_tagline",
  ] as const;

  for (const key of keys) {
    const value = String(formData.get(key) ?? "");
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/contact");
  return { ok: "Site settings saved." };
}
