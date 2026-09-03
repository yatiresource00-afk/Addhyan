import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { getOfferingBySlug } from "@/data/offerings";
import { formatPriceInr } from "@/lib/format";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Career Counselling",
  description:
    "Book career counselling with Addhyan Academy. A guidance service — not a self-paced course. ₹999 including GST.",
};

export default function CareerCounsellingPage() {
  const offering = getOfferingBySlug("career-counselling");
  if (!offering) notFound();

  return (
    <div className="py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <PageHeader
            eyebrow="Service"
            title="Career Counselling"
            description="A booked conversation to choose a direction. This is not a video course and does not include a lesson library."
          />
          <p className="text-navy text-xl font-semibold">
            {formatPriceInr(offering.price ?? 0)}{" "}
            <span className="text-muted-foreground text-base font-normal">incl. GST</span>
          </p>
          <p className="text-muted-foreground leading-relaxed">{offering.description}</p>
          <ul className="text-muted-foreground list-disc space-y-1 pl-5">
            {offering.targetAudience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <EnquiryForm type="counselling" submitLabel="Book Career Counselling" />
      </Container>
    </div>
  );
}
