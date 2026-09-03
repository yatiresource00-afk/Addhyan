import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Draft privacy notice for Addhyan Academy enquiries.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="max-w-3xl space-y-4">
        <PageHeader
          eyebrow="Legal"
          title="Privacy"
          description="Draft notice for this marketing site. Replace with counsel-approved copy before public launch."
        />
        <div className="text-muted-foreground space-y-4 leading-relaxed">
          <p>
            Find My Course runs in your browser. It does not send your answers to
            Addhyan. Enrolment, booking and contact forms are coming soon, so this
            site is not currently collecting enquiry submissions.
          </p>
          <p>
            Do not send passwords, payment card numbers or government IDs through
            any future form on this domain.
          </p>
          <p>
            Contact placeholders on this site are not a substitute for a full
            privacy policy. When official contact details are published, use those
            channels for access or deletion requests.
          </p>
        </div>
      </Container>
    </div>
  );
}
