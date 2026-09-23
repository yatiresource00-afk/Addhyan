import type { Metadata } from "next";
import { AuthForm } from "@/components/forms/AuthForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Create student account",
  description: "Register with your name, email and password, then confirm the email code.",
};

export default function RegisterPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-md space-y-8">
        <PageHeader
          eyebrow="Students"
          title="Create student account"
          description="Enter your name, email and a password. We email a 6-digit code. The account is created only after that code is correct."
        />
        <AuthForm mode="register" />
      </Container>
    </div>
  );
}
