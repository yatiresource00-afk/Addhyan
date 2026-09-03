import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { site } from "@/data/site";

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
          description="Draft notice covering enquiry data collected on this site. Replace with counsel-approved copy before public launch."
        />
        <div className="text-muted-foreground space-y-4 leading-relaxed">
          <p>
            {site.name} ({site.legalName}) collects the information you submit on
            enquiry forms: name, phone, email, and any optional details such as
            education, goals or organisation name.
          </p>
          <p>
            We use it to respond to your request, suggest a programme using
            published matching rules, and follow up about enrolment. Submissions
            are stored so the team can action them. Do not send passwords, payment
            card numbers or government IDs through these forms.
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
