import type { Metadata } from "next";
import { AuthForm } from "@/components/forms/AuthForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Create student account",
  description: "Register for an Addhyan Academy student account.",
};

export default function RegisterPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-md space-y-8">
        <PageHeader
          eyebrow="Students"
          title="Create student account"
          description="Register with email and an optional WhatsApp number so you can sign in with OTP later."
        />
        <AuthForm mode="register" />
      </Container>
    </div>
  );
}
