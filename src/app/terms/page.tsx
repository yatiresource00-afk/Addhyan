import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Draft terms of use for the Addhyan Academy website.",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="prose-muted max-w-3xl space-y-4">
        <PageHeader
          eyebrow="Legal"
          title="Terms of use"
          description="This is a draft until counsel for Yati Resource Private Limited provides the final terms."
        />
        <div className="text-muted-foreground space-y-4 leading-relaxed">
          <p>
            This website is operated by {site.legalName} for {site.name}. Content
            is provided for information about programmes and services. Enrolment,
            booking and enquiry forms are marked coming soon until those services
            are connected. Using this site does not create an enrolment contract.
          </p>
          <p>
            Programme descriptions, prices including GST, and availability may
            change. We will not grant access to paid lesson media based only on a
            public webpage.
          </p>
          <p>
            You must not scrape the site or attempt to access unpublished learning
            resources.
          </p>
        </div>
      </Container>
    </div>
  );
}
