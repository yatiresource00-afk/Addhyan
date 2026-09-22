import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { isStaffRole, roleHomePath } from "@/lib/auth/roles";

export const metadata: Metadata = {
  title: "Your account",
  description: "Your Addhyan Academy account.",
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  redirect(roleHomePath(user.role));
}
