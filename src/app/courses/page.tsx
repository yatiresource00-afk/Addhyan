import type { Metadata } from "next";
import { CourseGrid } from "@/components/course/CourseGrid";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { offerings } from "@/data/offerings";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Paid programmes, free CSR learning, and career services from Addhyan Academy.",
};

export default function CoursesPage() {
  const paid = offerings.filter((item) => item.category === "paid");
  const free = offerings.filter((item) =>
    ["free", "coming-soon"].includes(item.category)
  );
  const services = offerings.filter(
    (item) => item.category === "service" && item.slug !== "franchise"
  );

  return (
    <div className="py-12 sm:py-16">
      <Container className="space-y-14">
        <PageHeader
          eyebrow="Catalogue"
          title="Courses and learning paths"
          description="Paid programmes have published prices including GST. You can read the details now. Enrolment, booking and service requests are coming soon. Education is listed as coming soon."
        />
        <section id="paid" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl font-semibold">Paid courses</h2>
          <CourseGrid offerings={paid} />
        </section>
        <section id="free" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl font-semibold">Free learning</h2>
          <CourseGrid offerings={free} />
        </section>
        <section id="services" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl font-semibold">Career & services</h2>
          <CourseGrid offerings={services} />
        </section>
      </Container>
    </div>
  );
}
