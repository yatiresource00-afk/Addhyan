"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { loginSchema, registerSchema } from "@/lib/auth/schema";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { allowRequest } from "@/lib/rate-limit";
import { clearSessionCookie, setSessionCookie } from "@/lib/auth/session";

export type AuthState = { error?: string };

function emailKey(email: string) {
  return email.trim().toLowerCase();
}

export async function registerAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const email = emailKey(parsed.data.email);
  if (!allowRequest(`register:${email}`, 8, 10 * 60 * 1000)) {
    return { error: "Too many attempts. Please wait a few minutes." };
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with that email already exists. Try signing in." };
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email,
      passwordHash: await hashPassword(parsed.data.password),
    },
  });

  await setSessionCookie({ id: user.id, email: user.email, name: user.name });
  redirect("/account");
}

export async function loginAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const email = emailKey(parsed.data.email);
  if (!allowRequest(`login:${email}`, 12, 10 * 60 * 1000)) {
    return { error: "Too many attempts. Please wait a few minutes." };
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { error: "Email or password is not correct." };
  }

  await setSessionCookie({ id: user.id, email: user.email, name: user.name });
  redirect("/account");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/");
}
