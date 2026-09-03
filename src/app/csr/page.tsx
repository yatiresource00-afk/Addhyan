import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { getOfferingBySlug } from "@/data/offerings";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "CSR",
  description: "Free and community-oriented career and skill initiatives from Addhyan Academy.",
};

export default function CsrPage() {
  const offering = getOfferingBySlug("csr");
  if (!offering) notFound();

  return (
    <div className="py-12 sm:py-16">
      <div className="border-y border-[#cfe3c4] bg-[#eef7e6]">
        <Container className="py-12">
          <PageHeader
            eyebrow="Free learning"
            title="CSR – community initiatives"
            description="These programmes are not paid catalogue products. We do not invent impact statistics, headcounts or awards here."
          />
        </Container>
      </div>
      <Container className="grid gap-10 py-12 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">{offering.description}</p>
          <p className="text-muted-foreground leading-relaxed">
            If you want to join a community initiative, or to discuss a CSR
            collaboration, send an enquiry. We will only confirm what is actually
            open at the time.
          </p>
        </div>
        <EnquiryForm type="contact" submitLabel="Enquire about CSR" />
      </Container>
    </div>
  );
}
