import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Addhyan Academy is part of Yati Resource Private Limited — practical career education for students and professionals.",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="max-w-3xl space-y-8">
        <PageHeader
          eyebrow="About"
          title="Addhyan Academy"
          description={`${site.affiliation}. Operated as part of ${site.legalName}.`}
        />
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Addhyan Academy exists because many learners complete formal education
            without the workplace skills employers expect — and many people who do
            get jobs still struggle with communication, professionalism and growth.
          </p>
          <p>
            We focus on practical, affordable programmes: job readiness (JRP),
            career acceleration (JRP Advance), Basic and Advanced AI, plus booked
            career counselling. CSR covers community learning. Corporate training
            and franchise partnerships are enquiry-based, not student checkouts.
          </p>
          <p>
            We do not publish student counts, placement rates or testimonials on
            this site until they can be verified.
          </p>
        </div>
      </Container>
    </div>
  );
}
