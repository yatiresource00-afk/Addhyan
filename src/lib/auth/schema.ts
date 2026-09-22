import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine((value) => value === "" || value.replace(/\D/g, "").length >= 10, {
      message: "Enter a valid WhatsApp number",
    }),
  password: z.string().min(8, "Use at least 8 characters").max(72),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(120),
  password: z.string().min(1, "Enter your password").max(72),
});

export const adminLoginSchema = loginSchema;

export const emailOtpRequestSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(120),
});

export const whatsappOtpRequestSchema = z.object({
  phone: z.string().trim().min(10, "Enter a valid WhatsApp number").max(20),
});

export const otpVerifySchema = z.object({
  target: z.string().trim().min(5).max(120),
  code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code"),
  channel: z.enum(["EMAIL", "WHATSAPP"]),
});
