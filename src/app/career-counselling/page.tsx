import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { ComingSoonNotice } from "@/components/states/ComingSoonNotice";
import { getOfferingBySlug } from "@/data/offerings";
import { formatPriceInr } from "@/lib/format";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Career Counselling",
  description:
    "Career counselling with Addhyan Academy is a guidance service — not a self-paced course. Online booking is coming soon. ₹999 including GST.",
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
        <ComingSoonNotice
          title="Booking coming soon"
          description="Scheduling a counselling session needs a live calendar and a counsellor inbox. Those are not on this website yet, so bookings are marked coming soon rather than a form that cannot complete."
        />
      </Container>
    </div>
  );
}
