import type { Metadata } from "next";
import { AdminSignupForm } from "@/components/forms/AuthForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Administration sign up",
  description: "Create a Moderator or Director account for Addhyan Academy.",
  robots: { index: false, follow: false },
};

export default function AdminSignupPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-md space-y-8">
        <PageHeader
          eyebrow="Administration"
          title="Create staff account"
          description="Directors and Moderators only. Use the admin setup code. This page does not create student accounts."
        />
        <AdminSignupForm />
      </Container>
    </div>
  );
}
