import type { Metadata } from "next";
import { FindMyCourseForm } from "@/components/forms/FindMyCourseForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Find My Course",
  description:
    "Match your goal to JRP, JRP Advance, AI programmes, counselling or corporate training using published rules in your browser.",
};

export default function FindMyCoursePage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <PageHeader
            eyebrow="Guidance"
            title="Find my course"
            description="This matcher runs in your browser with simple published rules (for example: job preparation → JRP). It is not an AI engine. Enrolment, booking and a human follow-up are coming soon."
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
        <FindMyCourseForm />
      </Container>
    </div>
  );
}
