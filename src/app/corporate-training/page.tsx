import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { ComingSoonNotice } from "@/components/states/ComingSoonNotice";
import { getOfferingBySlug } from "@/data/offerings";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Corporate Training",
  description:
    "Workplace and AI skill training for organisations from Addhyan Academy. Online training requests are coming soon.",
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
            description="Training for teams, scoped with your organisation. There is no public checkout. Sending a request online is coming soon."
          />
          <p className="text-muted-foreground leading-relaxed">{offering.description}</p>
          <ul className="text-muted-foreground list-disc space-y-2 pl-5">
            {offering.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <ComingSoonNotice
          title="Requests coming soon"
          description="A real corporate request needs someone at Addhyan to receive and quote it. That inbox is not connected here yet, so the request form is coming soon."
        />
      </Container>
    </div>
  );
}
