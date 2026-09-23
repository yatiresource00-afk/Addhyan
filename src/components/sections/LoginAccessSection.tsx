import Link from "next/link";
import { GraduationCap, Shield } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function LoginAccessSection() {
  return (
    <section id="sign-in" className="border-y border-border bg-white py-16">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Account access"
          title="Student login and Administration login"
          description="Choose the portal that matches your role. Students open courses and progress. Moderators and Directors manage the academy."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <article className="flex flex-col rounded-xl border border-border bg-canvas p-6 sm:p-8">
            <div className="bg-secondary text-primary mb-4 inline-flex size-11 items-center justify-center rounded-lg">
              <GraduationCap className="size-5" aria-hidden />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-navy">Student login</h3>
            <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
              Sign in with password, email OTP or WhatsApp OTP to open your enrolled courses, video
              modules and learning progress.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
                Student sign in
              </Link>
              <Link
                href="/register"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}
              >
                Create student account
              </Link>
            </div>
          </article>

          <article className="flex flex-col rounded-xl border border-border bg-navy p-6 text-white sm:p-8">
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-white/10 text-white">
              <Shield className="size-5" aria-hidden />
            </div>
            <h3 className="font-heading text-2xl font-semibold">Administration login</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-white/80">
              For Moderators and Directors only. Manage users, enrolments, video lessons and site
              settings. Password, email OTP or WhatsApp OTP.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "h-11 px-5"
                )}
              >
                Admin sign in
              </Link>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
