import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Curriculum } from "@/components/course/Curriculum";
import { PriceLine } from "@/components/course/CourseCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/layout/Container";
import { FaqList } from "@/components/sections/FaqList";
import { Badge } from "@/components/ui/badge";
import { getOfferingBySlug, lessonCount, offerings } from "@/data/offerings";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return offerings
    .filter((item) => item.href.startsWith("/courses/"))
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offering = getOfferingBySlug(slug);
  if (!offering) return { title: "Programme" };
  return {
    title: offering.seo.title,
    description: offering.seo.description,
    openGraph: {
      title: offering.seo.title,
      description: offering.seo.description,
      images: [{ url: offering.thumbnail, alt: offering.title }],
    },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const offering = getOfferingBySlug(slug);
  if (!offering || !offering.href.startsWith("/courses/")) notFound();
  const lessons = lessonCount(offering);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: offering.title,
    description: offering.seo.description,
    provider: {
      "@type": "Organization",
      name: site.name,
      parentOrganization: site.legalName,
    },
  };

  return (
    <div className="py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="space-y-10">
          <header className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={offering.thumbnail}
                alt=""
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>{offering.level}</Badge>
              <Badge variant="secondary">{offering.duration}</Badge>
              {lessons > 0 ? (
                <Badge variant="outline">{lessons} lessons</Badge>
              ) : null}
            </div>
            <p className="text-primary font-semibold">{offering.positioning}</p>
            <h1 className="text-3xl font-semibold sm:text-4xl">{offering.title}</h1>
            <PriceLine offering={offering} />
            <p className="text-muted-foreground text-lg leading-relaxed">
              {offering.valueProposition}
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Who it is for</h2>
            <ul className="text-muted-foreground list-disc space-y-1 pl-5">
              {offering.targetAudience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">About this programme</h2>
            <p className="text-muted-foreground leading-relaxed">{offering.description}</p>
          </section>

          {offering.outcomes.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Outcomes</h2>
              <ul className="text-muted-foreground list-disc space-y-1 pl-5">
                {offering.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {offering.modules.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Curriculum</h2>
              <Curriculum offering={offering} />
            </section>
          ) : null}

          {offering.practicalActivities.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Practical activities</h2>
              <ul className="text-muted-foreground list-disc space-y-1 pl-5">
                {offering.practicalActivities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {offering.projects.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <ul className="text-muted-foreground list-disc space-y-1 pl-5">
                {offering.projects.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Certificate</h2>
            <p className="text-muted-foreground leading-relaxed">
              {offering.certificate.summary}
            </p>
          </section>

          {offering.instructor ? (
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Instructor</h2>
              <p>
                {offering.instructor.name}, {offering.instructor.role}
              </p>
            </section>
          ) : null}

          {offering.faqs.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">FAQs</h2>
              <FaqList items={offering.faqs} />
            </section>
          ) : null}

          <p className="text-muted-foreground text-sm">
            Lesson videos, PDFs and progress tracking will live behind enrolment.
            They are not published on this public page.
          </p>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-4 rounded-xl border border-border bg-white p-5">
            <h2 className="text-xl font-semibold">
              {offering.ctaType === "coming-soon" ? "Register interest" : "Next step"}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {offering.ctaType === "coming-soon"
                ? "This category is not open yet. Share your details and we will contact you when it launches."
                : "Payment and student login are not live yet. Send an enrolment enquiry and Addhyan will follow up."}
            </p>
            <EnquiryForm
              type="course-interest"
              courseSlug={offering.slug}
              submitLabel={offering.ctaLabel}
            />
            <p className="text-muted-foreground text-xs">
              Prefer a conversation first?{" "}
              <Link href="/find-my-course" className="text-primary">
                Find my course
              </Link>{" "}
              or{" "}
              <Link href="/career-counselling" className="text-primary">
                book counselling
              </Link>
              .
            </p>
          </div>
        </aside>
      </Container>
    </div>
  );
}
