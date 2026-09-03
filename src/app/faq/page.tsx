import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { FaqList } from "@/components/sections/FaqList";
import { PageHeader } from "@/components/sections/SectionHeader";
import { siteFaqs } from "@/data/faqs";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Addhyan Academy programmes, pricing and services.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="space-y-8">
        <PageHeader
          eyebrow="Help"
          title="Frequently asked questions"
          description={`Answers about ${site.name} programmes, GST-inclusive pricing, and how enrolment currently works.`}
        />
        <FaqList items={siteFaqs} />
      </Container>
    </div>
  );
}
