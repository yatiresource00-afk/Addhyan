import type { Metadata } from "next";
import { AdminAuthForm } from "@/components/forms/AuthForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Administration sign in",
  description: "Moderator and Director sign in for Addhyan Academy.",
};

export default function AdminLoginPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-md space-y-8">
        <PageHeader
          eyebrow="Administration"
          title="Staff sign in"
          description="For Moderators and Directors only. Password, email OTP or WhatsApp OTP."
        />
        <AdminAuthForm />
      </Container>
    </div>
  );
}
