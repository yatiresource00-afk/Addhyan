"use server";

import { redirect } from "next/navigation";
import type { OtpChannel, OtpPurpose, Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { timingSafeEqual } from "node:crypto";
import {
  adminLoginSchema,
  adminSignupSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/lib/auth/schema";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { allowRequest } from "@/lib/rate-limit";
import {
  clearSessionCookie,
  setSessionCookie,
  type SessionUser,
} from "@/lib/auth/session";
import { isStaffRole, roleHomePath } from "@/lib/auth/roles";
import { staffAssignmentFor } from "@/lib/auth/staff-allowlist";
import {
  generateOtpCode,
  hashOtpCode,
  normalizeEmail,
  normalizePhone,
  otpExpiresAt,
} from "@/lib/auth/otp";
import { sendEmailOtp, sendWhatsAppOtp } from "@/lib/otp/providers";

export type AuthState = {
  error?: string;
  ok?: string;
  step?: "code";
  channel?: "EMAIL" | "WHATSAPP";
  target?: string;
  /** Shown only when OTP delivery is in local/dev mode (no provider keys). */
  devCode?: string;
};

function toSession(user: {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone: string | null;
}): SessionUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone,
  };
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

  const email = normalizeEmail(parsed.data.email);
  if (staffAssignmentFor(email)) {
    return { error: "Staff emails use Administration sign in." };
  }
  if (!allowRequest(`register:${email}`, 8, 10 * 60 * 1000)) {
    return { error: "Too many attempts. Please wait a few minutes." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with that email already exists. Try signing in." };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  return createAndSendOtp({
    channel: "EMAIL",
    purpose: "SIGNUP",
    target: email,
    payload: JSON.stringify({ name: parsed.data.name, passwordHash }),
    emailMessage: {
      subject: "Confirm your Addhyan Academy account",
      text: "Your Addhyan Academy sign-up code is {{code}}. It expires in 10 minutes.",
    },
  });
}

export async function verifyStudentSignupAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = normalizeEmail(String(formData.get("email") || ""));
  const code = String(formData.get("code") || "").trim();
  if (!/^\d{6}$/.test(code)) {
    return { error: "Enter the 6-digit code from your email.", step: "code", channel: "EMAIL", target: email };
  }

  const challenge = await findOpenEmailChallenge(email, "SIGNUP");
  if (!challenge?.payload) {
    return { error: "Code expired or not found. Start sign up again." };
  }
  const matched = await consumeOtpIfValid(challenge, code);
  if (!matched.ok) {
    return { error: matched.error, step: "code", channel: "EMAIL", target: email };
  }

  const payload = JSON.parse(challenge.payload) as { name?: string; passwordHash?: string };
  if (!payload.name || !payload.passwordHash) {
    return { error: "Sign up could not be completed. Start again." };
  }

  const already = await prisma.user.findUnique({ where: { email } });
  if (already) {
    return { error: "An account with that email already exists. Try signing in." };
  }

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email,
      passwordHash: payload.passwordHash,
      role: "STUDENT",
    },
  });
  await setSessionCookie(toSession(user));
  redirect("/learn");
}

export async function requestPasswordResetAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = normalizeEmail(String(formData.get("email") || ""));
  if (!email.includes("@")) return { error: "Enter a valid email." };
  if (!allowRequest(`reset:${email}`, 6, 10 * 60 * 1000)) {
    return { error: "Too many attempts. Please wait a few minutes." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || isStaffRole(user.role)) {
    return { error: "No student account was found for that email." };
  }

  return createAndSendOtp({
    channel: "EMAIL",
    purpose: "RESET_PASSWORD",
    target: email,
    userId: user.id,
    emailMessage: {
      subject: "Reset your Addhyan Academy password",
      text: "Your Addhyan Academy password reset code is {{code}}. It expires in 10 minutes.",
    },
  });
}

export async function resetPasswordAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = resetPasswordSchema.safeParse({
    email: formData.get("email"),
    code: formData.get("code"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    const email = normalizeEmail(String(formData.get("email") || ""));
    return {
      error: parsed.error.issues[0]?.message ?? "Check the form and try again.",
      step: "code",
      channel: "EMAIL",
      target: email,
    };
  }

  const email = normalizeEmail(parsed.data.email);
  const challenge = await findOpenEmailChallenge(email, "RESET_PASSWORD");
  if (!challenge) {
    return { error: "Code expired or not found. Request a new code.", step: "code", channel: "EMAIL", target: email };
  }
  const matched = await consumeOtpIfValid(challenge, parsed.data.code);
  if (!matched.ok) {
    return { error: matched.error, step: "code", channel: "EMAIL", target: email };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || isStaffRole(user.role)) {
    return { error: "No student account was found for that email." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(parsed.data.password) },
  });
  await setSessionCookie(toSession(user));
  redirect("/learn");
}

async function passwordLogin(
  formData: FormData,
  opts: { staffOnly: boolean }
): Promise<AuthState> {
  const schema = opts.staffOnly ? adminLoginSchema : loginSchema;
  const parsed = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const email = normalizeEmail(parsed.data.email);
  const key = opts.staffOnly ? `admin-login:${email}` : `login:${email}`;
  if (!allowRequest(key, 12, 10 * 60 * 1000)) {
    return { error: "Too many attempts. Please wait a few minutes." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user?.passwordHash || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { error: "Email or password is not correct." };
  }

  if (opts.staffOnly && !isStaffRole(user.role)) {
    return { error: "Administration access is only for approved Director and Moderator emails." };
  }
  if (opts.staffOnly && staffAssignmentFor(user.email)?.role !== user.role) {
    return { error: "This email is not approved for administration." };
  }
  if (!opts.staffOnly && isStaffRole(user.role)) {
    return {
      error: "Staff accounts sign in on the Administration login page.",
    };
  }

  await setSessionCookie(toSession(user));
  redirect(roleHomePath(user.role));
}

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  return passwordLogin(formData, { staffOnly: false });
}

export async function adminLoginAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  return passwordLogin(formData, { staffOnly: true });
}

function adminSignupCodeMatches(input: string) {
  const expected = process.env.ADMIN_SIGNUP_CODE || "AddhyanDirectorSetup";
  const given = Buffer.from(input);
  const wanted = Buffer.from(expected);
  if (given.length !== wanted.length) return false;
  return timingSafeEqual(given, wanted);
}

export async function adminSignupAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = adminSignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    password: formData.get("password"),
    signupCode: formData.get("signupCode"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }
  if (!adminSignupCodeMatches(parsed.data.signupCode)) {
    return { error: "Admin setup code is not correct." };
  }

  const email = normalizeEmail(parsed.data.email);
  const assignment = staffAssignmentFor(email);
  if (!assignment) {
    return { error: "This email is not approved for administration." };
  }
  const phone = parsed.data.phone ? normalizePhone(parsed.data.phone) : null;
  if (!allowRequest(`admin-signup:${email}`, 6, 10 * 60 * 1000)) {
    return { error: "Too many attempts. Please wait a few minutes." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with that email already exists. Sign in instead." };
  }
  if (phone) {
    const phoneTaken = await prisma.user.findUnique({ where: { phone } });
    if (phoneTaken) {
      return { error: "That WhatsApp number is already linked to an account." };
    }
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email,
      phone,
      role: assignment.role,
      passwordHash: await hashPassword(parsed.data.password),
    },
  });

  await setSessionCookie(toSession(user));
  redirect("/admin");
}

async function findOpenEmailChallenge(target: string, purpose: OtpPurpose) {
  return prisma.otpChallenge.findFirst({
    where: {
      target,
      channel: "EMAIL",
      purpose,
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function consumeOtpIfValid(
  challenge: { id: string; codeHash: string; attempts: number },
  code: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (challenge.attempts >= 5) {
    return { ok: false, error: "Too many incorrect attempts. Request a new code." };
  }
  const matches = challenge.codeHash === hashOtpCode(code);
  await prisma.otpChallenge.update({
    where: { id: challenge.id },
    data: {
      attempts: { increment: 1 },
      consumedAt: matches ? new Date() : undefined,
    },
  });
  if (!matches) return { ok: false, error: "Incorrect code. Try again." };
  return { ok: true };
}

async function createAndSendOtp(opts: {
  channel: OtpChannel;
  purpose: OtpPurpose;
  target: string;
  userId?: string | null;
  payload?: string;
  emailMessage?: { subject: string; text: string };
}): Promise<AuthState> {
  const code = generateOtpCode();
  await prisma.otpChallenge.create({
    data: {
      channel: opts.channel,
      purpose: opts.purpose,
      target: opts.target,
      userId: opts.userId ?? null,
      payload: opts.payload,
      codeHash: hashOtpCode(code),
      expiresAt: otpExpiresAt(10),
    },
  });

  const emailMessage = opts.emailMessage
    ? {
        subject: opts.emailMessage.subject,
        text: opts.emailMessage.text.replace("{{code}}", code),
      }
    : undefined;

  const sent =
    opts.channel === "EMAIL"
      ? await sendEmailOtp(opts.target, code, emailMessage)
      : await sendWhatsAppOtp(opts.target, code);

  if (!sent.ok) return { error: sent.error };

  return {
    ok:
      sent.mode === "dev"
        ? "OTP ready (dev mode — provider keys not configured)."
        : `OTP sent by ${opts.channel === "EMAIL" ? "email" : "WhatsApp"}.`,
    step: "code",
    channel: opts.channel,
    target: opts.target,
    devCode: sent.mode === "dev" ? code : undefined,
  };
}

export async function requestEmailOtpAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = normalizeEmail(String(formData.get("email") || ""));
  const purpose = (String(formData.get("purpose") || "LOGIN") === "ADMIN_LOGIN"
    ? "ADMIN_LOGIN"
    : "LOGIN") as OtpPurpose;

  if (!email.includes("@")) return { error: "Enter a valid email." };
  if (!allowRequest(`otp-email:${purpose}:${email}`, 6, 10 * 60 * 1000)) {
    return { error: "Too many OTP requests. Please wait a few minutes." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "No account found for that email. Register first." };
  }
  if (purpose === "ADMIN_LOGIN" && staffAssignmentFor(user.email)?.role !== user.role) {
    return { error: "Administration OTP is only for approved staff emails." };
  }
  if (purpose === "LOGIN" && isStaffRole(user.role)) {
    return { error: "Staff accounts use Administration login." };
  }

  return createAndSendOtp({
    channel: "EMAIL",
    purpose,
    target: email,
    userId: user.id,
  });
}

export async function requestWhatsAppOtpAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const phone = normalizePhone(String(formData.get("phone") || ""));
  const purpose = (String(formData.get("purpose") || "LOGIN") === "ADMIN_LOGIN"
    ? "ADMIN_LOGIN"
    : "LOGIN") as OtpPurpose;

  if (phone.replace(/\D/g, "").length < 10) {
    return { error: "Enter a valid WhatsApp number with country code." };
  }
  if (!allowRequest(`otp-wa:${purpose}:${phone}`, 6, 10 * 60 * 1000)) {
    return { error: "Too many OTP requests. Please wait a few minutes." };
  }

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    return {
      error:
        "No account found for that WhatsApp number. Register with your number first, or ask admin to link it.",
    };
  }
  if (purpose === "ADMIN_LOGIN" && staffAssignmentFor(user.email)?.role !== user.role) {
    return { error: "Administration OTP is only for approved staff emails." };
  }
  if (purpose === "LOGIN" && isStaffRole(user.role)) {
    return { error: "Staff accounts use Administration login." };
  }

  return createAndSendOtp({
    channel: "WHATSAPP",
    purpose,
    target: phone,
    userId: user.id,
  });
}

export async function verifyOtpAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const channel = String(formData.get("channel") || "") as OtpChannel;
  const purpose = (String(formData.get("purpose") || "LOGIN") === "ADMIN_LOGIN"
    ? "ADMIN_LOGIN"
    : "LOGIN") as OtpPurpose;
  const rawTarget = String(formData.get("target") || "");
  const code = String(formData.get("code") || "").trim();
  const target =
    channel === "EMAIL" ? normalizeEmail(rawTarget) : normalizePhone(rawTarget);

  if (channel !== "EMAIL" && channel !== "WHATSAPP") {
    return { error: "Invalid OTP channel." };
  }
  if (!/^\d{6}$/.test(code)) {
    return {
      error: "Enter the 6-digit code.",
      step: "code",
      channel,
      target,
    };
  }
  if (!allowRequest(`otp-verify:${purpose}:${target}`, 20, 10 * 60 * 1000)) {
    return { error: "Too many attempts. Please wait a few minutes." };
  }

  const challenge = await prisma.otpChallenge.findFirst({
    where: {
      target,
      channel,
      purpose,
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!challenge) {
    return {
      error: "Code expired or not found. Request a new OTP.",
      step: "code",
      channel,
      target,
    };
  }
  if (challenge.attempts >= 5) {
    return { error: "Too many incorrect attempts. Request a new OTP." };
  }

  const ok = challenge.codeHash === hashOtpCode(code);
  await prisma.otpChallenge.update({
    where: { id: challenge.id },
    data: {
      attempts: { increment: 1 },
      consumedAt: ok ? new Date() : undefined,
    },
  });

  if (!ok) {
    return {
      error: "Incorrect code. Try again.",
      step: "code",
      channel,
      target,
    };
  }

  const user =
    (challenge.userId
      ? await prisma.user.findUnique({ where: { id: challenge.userId } })
      : null) ??
    (channel === "EMAIL"
      ? await prisma.user.findUnique({ where: { email: target } })
      : await prisma.user.findUnique({ where: { phone: target } }));

  if (!user) {
    return { error: "Account not found for this OTP." };
  }
  if (purpose === "ADMIN_LOGIN" && staffAssignmentFor(user.email)?.role !== user.role) {
    return { error: "Administration access denied." };
  }
  if (purpose === "LOGIN" && isStaffRole(user.role)) {
    return { error: "Staff accounts use Administration login." };
  }

  await setSessionCookie(toSession(user));
  redirect(roleHomePath(user.role));
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/");
}
