import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { ComingSoonNotice } from "@/components/states/ComingSoonNotice";
import { getOfferingBySlug } from "@/data/offerings";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "CSR",
  description: "Free and community-oriented career and skill initiatives from Addhyan Academy. Applications are coming soon.",
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
            Details of a specific initiative will be published when one is open.
            Applying or partnering through this site is coming soon.
          </p>
        </div>
        <ComingSoonNotice
          title="Applications coming soon"
          description="Joining a CSR initiative needs a live programme and a way to register. Neither is connected here yet."
        />
      </Container>
    </div>
  );
}
