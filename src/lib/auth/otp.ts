import { createHash, randomInt } from "node:crypto";

export function generateOtpCode() {
  return String(randomInt(100000, 999999));
}

export function hashOtpCode(code: string) {
  return createHash("sha256").update(code).digest("hex");
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

/** Keep digits and leading + for E.164-ish targets. */
export function normalizePhone(phone: string) {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    return `+${digits.slice(1).replace(/\D/g, "")}`;
  }
  const only = digits.replace(/\D/g, "");
  if (only.length === 10) return `+91${only}`;
  if (only.length === 12 && only.startsWith("91")) return `+${only}`;
  return only.startsWith("+") ? only : `+${only}`;
}

export function otpExpiresAt(minutes = 10) {
  return new Date(Date.now() + minutes * 60 * 1000);
}
