import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Find My Course",
  description:
    "Tell Addhyan Academy your goals. We use published matching rules to suggest JRP, JRP Advance, AI programmes, counselling or corporate training.",
};

export default function FindMyCoursePage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <PageHeader
            eyebrow="Guidance"
            title="Find my course"
            description="Share your situation. We match it to a programme using simple rules (for example: job preparation → JRP). A person still confirms the recommendation — this is not an AI engine."
          />
          <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
            <li>Job preparation → JRP</li>
            <li>Career growth → JRP Advance</li>
            <li>AI beginner → Basic AI</li>
            <li>Existing AI knowledge → Advanced AI</li>
            <li>Career uncertainty → Career Counselling</li>
            <li>Company training → Corporate Training</li>
          </ul>
        </div>
        <EnquiryForm type="find-my-course" submitLabel="Get a suggested programme" />
      </Container>
    </div>
  );
}
