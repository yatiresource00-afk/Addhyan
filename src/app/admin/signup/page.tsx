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
          description="Create a Director or Moderator. Setup code: AddhyanDirectorSetup. A ready Director account is also listed under the form."
        />
        <AdminSignupForm />
        <div className="rounded-xl border border-border bg-white p-5 text-sm">
          <p className="font-medium text-navy">Ready Director account</p>
          <p className="text-muted-foreground mt-2">
            Email: director@addhyan.academy
            <br />
            Password: Director@Addhyan1
          </p>
          <p className="text-muted-foreground mt-3">
            Moderator: moderator@addhyan.academy / Moderator@Addhyan1
          </p>
        </div>
      </Container>
    </div>
  );
}
