import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { getOfferingBySlug } from "@/data/offerings";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Corporate Training",
  description: "Request workplace and AI skill training for your organisation from Addhyan Academy.",
};

export default function CorporateTrainingPage() {
  const offering = getOfferingBySlug("corporate-training");
  if (!offering) notFound();

  return (
    <div className="py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <PageHeader
            eyebrow="Organisations"
            title="Corporate Training"
            description="Enquiry-based training for teams. There is no public checkout or fixed shopping-cart price."
          />
          <p className="text-muted-foreground leading-relaxed">{offering.description}</p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-5">
            {offering.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <EnquiryForm type="corporate" submitLabel="Request Corporate Training" />
      </Container>
    </div>
  );
}
