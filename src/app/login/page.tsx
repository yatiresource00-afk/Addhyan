import type { Metadata } from "next";
import { AuthForm } from "@/components/forms/AuthForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Addhyan Academy account.",
};

export default function LoginPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="mx-auto max-w-md space-y-8">
        <PageHeader
          eyebrow="Account"
          title="Sign in"
          description="Use the email and password you registered with. This runs on this site’s Node.js database — not a third-party login provider."
        />
        <AuthForm mode="login" />
      </Container>
    </div>
  );
}
