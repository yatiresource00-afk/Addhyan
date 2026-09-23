import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminSignupForm } from "@/components/forms/AuthForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { getCurrentUser } from "@/lib/auth/session";
import { isStaffRole } from "@/lib/auth/roles";

export const metadata: Metadata = {
  title: "Administration sign up",
  description: "Approved Director and Moderator sign up for Addhyan Academy.",
  robots: { index: false, follow: false },
};

export default async function AdminSignupPage() {
  const user = await getCurrentUser();
  if (user && !isStaffRole(user.role)) redirect("/learn");
  if (user && isStaffRole(user.role)) redirect("/admin");

  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-md space-y-8">
        <PageHeader
          eyebrow="Administration"
          title="Staff sign up"
          description="Students cannot create an administration account. Only approved Yati Resource email addresses are accepted, and the role is fixed for each address."
        />
        <AdminSignupForm />
      </Container>
    </div>
  );
}
