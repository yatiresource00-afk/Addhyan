import Link from "next/link";
import { HomeHero } from "@/components/sections/HomeHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CourseGrid } from "@/components/course/CourseGrid";
import { FaqList } from "@/components/sections/FaqList";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/layout/Container";
import { featuredOfferings, getOfferingBySlug } from "@/data/offerings";
import { siteFaqs } from "@/data/faqs";
import { Briefcase, GraduationCap, Sparkles, Users } from "lucide-react";

const why = [
  {
    icon: Briefcase,
    title: "Built for work, not only exams",
    body: "JRP and JRP Advance focus on etiquette, communication, interviews and career growth — the skills people are rarely taught in class.",
  },
  {
    icon: Sparkles,
    title: "AI you can actually use",
    body: "Basic AI and Advanced AI cover tools, prompting, workflows and automation without requiring a computer-science degree.",
  },
  {
    icon: GraduationCap,
    title: "Clear, honest pricing",
    body: "Published fees include GST. There are no invented placement rates or hidden “limited seats” claims on this site.",
  },
  {
    icon: Users,
    title: "For more than one life stage",
    body: "School-leavers, college students, freshers, job seekers and working professionals can all find a next step — including counselling if they are unsure.",
  },
];

const benefits = [
  "Workplace behaviour and professional communication",
  "Interview and career-branding practice on JRP Advance",
  "Responsible everyday AI, then workflows if you are ready",
  "A counselling path when the course choice is unclear",
  "CSR initiatives for community learning",
  "Corporate and franchise conversations kept separate from student checkout",
];

const categories = [
  {
    href: "/courses#paid",
    title: "Paid programmes",
    body: "JRP, JRP Advance, Basic AI and Advanced AI.",
  },
  {
    href: "/courses#free",
    title: "Free learning",
    body: "CSR community initiatives. Education is listed as coming soon.",
  },
  {
    href: "/courses#services",
    title: "Career & services",
    body: "Career counselling and corporate training — enquiry-led, not self-paced catalogues.",
  },
];

export default function HomePage() {
  const csr = getOfferingBySlug("csr");

  return (
    <>
      <HomeHero />
      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-primary text-sm font-semibold tracking-wide uppercase">
              The career gap
            </p>
            <h2 className="text-3xl font-semibold">
              Many people finish education without job-ready skills.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Others get a job and still struggle with workplace performance,
              communication, professionalism and progression. Addhyan exists to
              close that gap with practical, affordable programmes.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6">
            <h3 className="text-xl font-semibold">What Addhyan offers instead</h3>
            <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5">
              <li>Job-readiness (JRP) and career acceleration (JRP Advance)</li>
              <li>AI skills at beginner and workflow level</li>
              <li>Booked career counselling when you need a decision, not a playlist</li>
              <li>Team training and franchise partnerships on request</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Programmes"
            title="Featured courses"
            description="Four paid programmes with published prices. Enrolment currently starts with an enquiry — payments and the student dashboard are not live yet."
          />
          <CourseGrid offerings={featuredOfferings()} />
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-10">
          <SectionHeader eyebrow="Why Addhyan" title="Student-focused, not a generic template" />
          <ul className="grid gap-6 sm:grid-cols-2">
            {why.map((item) => (
              <li key={item.title} className="rounded-xl border border-border bg-white p-6">
                <item.icon className="text-primary mb-3 size-6" aria-hidden />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              className="mx-0 text-left"
              eyebrow="Learning benefits"
              title="What you can walk away with"
            />
            <ul className="text-muted-foreground mt-6 list-disc space-y-2 pl-5">
              {benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader
              className="mx-0 text-left"
              eyebrow="Categories"
              title="Choose a starting point"
            />
            <ul className="mt-6 space-y-3">
              {categories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:border-primary block rounded-xl border border-border p-4 transition-colors"
                  >
                    <p className="font-heading font-semibold">{item.title}</p>
                    <p className="text-muted-foreground text-sm">{item.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-y border-[#cfe3c4] bg-[#eef7e6] py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-green text-sm font-semibold tracking-wide uppercase">
              Free learning
            </p>
            <h2 className="text-3xl font-semibold">CSR community initiatives</h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              {csr?.description} We do not publish participant counts or impact
              figures that we cannot verify.
            </p>
          </div>
          <Link
            href="/csr"
            className="bg-green inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-medium text-white transition-colors hover:bg-[#347819]"
          >
            Explore CSR
          </Link>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-8">
          <SectionHeader eyebrow="FAQ" title="Common questions" />
          <FaqList items={siteFaqs.slice(0, 6)} />
          <p className="text-center">
            <Link href="/faq" className="text-primary text-sm font-medium">
              View all FAQs
            </Link>
          </p>
        </Container>
      </section>

      <CtaBand
        title="Not sure where to start?"
        description="Tell us your goal. We will use simple matching rules — not a black-box AI — to suggest a programme, then a person follows up."
        primaryHref="/find-my-course"
        primaryLabel="Find my course"
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />
    </>
  );
}
