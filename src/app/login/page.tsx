import type { Metadata } from "next";
import { AuthForm } from "@/components/forms/AuthForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Student sign in",
  description: "Sign in to Addhyan Academy with password, email OTP or WhatsApp OTP.",
};

export default function LoginPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-md space-y-8">
        <PageHeader
          eyebrow="Students"
          title="Student sign in"
          description="Use password, email OTP or WhatsApp OTP. After signing in you can open your courses, video modules and progress."
        />
        <AuthForm mode="login" />
      </Container>
    </div>
  );
}
