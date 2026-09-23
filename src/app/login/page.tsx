import type { Metadata } from "next";
import { AuthForm } from "@/components/forms/AuthForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Student sign in",
  description: "Sign in to Addhyan Academy with your email and password.",
};

export default function LoginPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-md space-y-8">
        <PageHeader
          eyebrow="Students"
          title="Student sign in"
          description="Use the email and password from your account. New students confirm their email with a code before the account is created."
        />
        <AuthForm mode="login" />
      </Container>
    </div>
  );
}
