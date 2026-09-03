import type { Metadata } from "next";
import { AuthForm } from "@/components/forms/AuthForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Create account",
  description: "Register for an Addhyan Academy account.",
};

export default function RegisterPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-md space-y-8">
        <PageHeader
          eyebrow="Account"
          title="Create an account"
          description="Registration stores your account on this server. Course enrolment and the learning dashboard are still coming soon."
        />
        <AuthForm mode="register" />
      </Container>
    </div>
  );
}
