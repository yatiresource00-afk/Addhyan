import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { ComingSoonNotice } from "@/components/states/ComingSoonNotice";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details for Addhyan Academy. The message form is coming soon until an official inbox is connected.",
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-2">
        <PageHeader
          eyebrow="Contact"
          title="Talk to Addhyan"
          description="Official phone, email and postal address will replace the placeholders below when they are published. The send-message form is coming soon."
        />
        <div className="space-y-4 rounded-xl border border-border bg-white p-5 text-sm">
          <p>
            <span className="font-medium">Email:</span> {site.contact.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {site.contact.phone}
          </p>
          <p>
            <span className="font-medium">Address:</span> {site.contact.address}
          </p>
          <p className="text-muted-foreground">{site.contact.note}</p>
        </div>
        <div className="lg:col-span-2 max-w-2xl">
          <ComingSoonNotice
            title="Message form coming soon"
            description="A contact form only works if messages reach Addhyan. Until an official inbox is connected, this form is coming soon rather than a submission that goes nowhere."
          />
        </div>
      </Container>
    </div>
  );
}
