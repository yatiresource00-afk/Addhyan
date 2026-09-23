import type { Role } from "@prisma/client";

export const STAFF_ALLOWLIST = [
  { email: "pulak@yatiresource.com", role: "DIRECTOR", name: "Pulak" },
  { email: "sales@yatiresource.com", role: "MODERATOR", name: "Sales" },
  { email: "accounts@yatiresource.com", role: "MODERATOR", name: "Accounts" },
] as const satisfies readonly { email: string; role: Role; name: string }[];

export function staffAssignmentFor(email: string) {
  const key = email.trim().toLowerCase();
  return STAFF_ALLOWLIST.find((row) => row.email === key) ?? null;
}

export function isApprovedStaffEmail(email: string) {
  return staffAssignmentFor(email) !== null;
}
