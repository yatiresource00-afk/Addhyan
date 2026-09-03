import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Addhyan Academy about programmes, counselling, corporate training or franchise.",
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-2">
        <PageHeader
          eyebrow="Contact"
          title="Talk to Addhyan"
          description="Use the form and we will get back to you. Official phone, email and postal address will replace the placeholders below when they are published."
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
          <EnquiryForm type="contact" submitLabel="Send message" />
        </div>
      </Container>
    </div>
  );
}
