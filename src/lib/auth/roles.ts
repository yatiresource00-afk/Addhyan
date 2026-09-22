import type { Role } from "@prisma/client";

export const STAFF_ROLES = ["MODERATOR", "DIRECTOR"] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];

export function isStaffRole(role: Role | string | null | undefined): role is StaffRole {
  return role === "MODERATOR" || role === "DIRECTOR";
}

export function isDirector(role: Role | string | null | undefined) {
  return role === "DIRECTOR";
}

export function roleHomePath(role: Role | string | null | undefined) {
  if (isStaffRole(role)) return "/admin";
  return "/learn";
}

export function roleLabel(role: Role | string) {
  switch (role) {
    case "DIRECTOR":
      return "Director";
    case "MODERATOR":
      return "Moderator";
    default:
      return "Student";
  }
}
