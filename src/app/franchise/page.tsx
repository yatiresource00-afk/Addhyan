import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Franchise with Addhyan",
  description: "Enquire about partnering with Addhyan Academy. Franchise is a business conversation, not a student course.",
};

const benefits = [
  "Carry Addhyan’s workplace-readiness and AI programme positioning in your market",
  "A structured enquiry so we can qualify fit before any operational discussion",
  "Separate from student enrolment — partners are not buying a course seat",
];

const support = [
  "Programme messaging aligned to JRP, JRP Advance, Basic AI and Advanced AI",
  "Guidance on who the programmes are for (students through working professionals)",
  "A named follow-up if the enquiry looks like a potential fit",
];

const process = [
  "Share your city, background and why you want to partner",
  "Addhyan reviews whether the market and model could work",
  "If there is a fit, a conversation on support, operations and next steps",
];

export default function FranchisePage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="space-y-12">
        <PageHeader
          eyebrow="Partnership"
          title="Franchise with Addhyan"
          description="For education entrepreneurs and training centres who want to take Addhyan programmes to their city or network. This is not a student course."
        />
        <div className="grid gap-8 lg:grid-cols-3">
          <Block title="Opportunity" items={["Local delivery of practical career education", "Audience from Class 10–12 through working professionals", "Paid programmes plus counselling and CSR as distinct offers"]} />
          <Block title="Benefits" items={benefits} />
          <Block title="Support" items={support} />
        </div>
        <section className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Process</h2>
            <ol className="text-muted-foreground mt-4 list-decimal space-y-2 pl-5">
              {process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <EnquiryForm type="franchise" submitLabel="Enquire about franchise" />
        </section>
      </Container>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
