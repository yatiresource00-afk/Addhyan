import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/forms/AuthForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset your Addhyan Academy student password with an email code.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-md space-y-8">
        <PageHeader
          eyebrow="Students"
          title="Forgot password"
          description="Enter your student email. We will send a 6-digit code so you can choose a new password."
        />
        <ForgotPasswordForm />
      </Container>
    </div>
  );
}
