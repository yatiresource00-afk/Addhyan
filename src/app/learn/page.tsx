import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { buttonVariants } from "@/components/ui/button-variants";
import { getCurrentUser } from "@/lib/auth/session";
import { isStaffRole, roleHomePath } from "@/lib/auth/roles";
import { prisma } from "@/lib/db";
import { getStudentCourseProgress, offeringBySlug } from "@/lib/learning/queries";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "My learning",
  description: "Your enrolled courses, video modules and progress.",
  robots: { index: false, follow: false },
};

export default async function LearnHomePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/learn");
  if (isStaffRole(user.role)) redirect(roleHomePath(user.role));

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id, status: "active" },
    orderBy: { createdAt: "desc" },
  });

  const courses = await Promise.all(
    enrollments.map(async (enrollment) => {
      const offering = offeringBySlug(enrollment.courseSlug);
      const progress = await getStudentCourseProgress(user.id, enrollment.courseSlug);
      return { enrollment, offering, progress };
    })
  );

  return (
    <div className="py-12 sm:py-16">
      <Container className="space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <PageHeader
            eyebrow="Student portal"
            title={`Welcome, ${user.name}`}
            description="Open your enrolled courses, watch video modules and track progress."
          />
          <form action={logoutAction}>
            <Button type="submit" variant="outline" className="h-10 px-4">
              Sign out
            </Button>
          </form>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-white p-8 text-center">
            <h2 className="font-heading text-xl font-semibold text-navy">No courses yet</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              When a Moderator or Director enrols you, your programmes will appear here.
            </p>
            <Link href="/courses" className={cn(buttonVariants(), "mt-5 inline-flex h-11 px-5")}>
              Browse catalogue
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map(({ enrollment, offering, progress }) => (
              <Link
                key={enrollment.id}
                href={`/learn/${enrollment.courseSlug}`}
                className="rounded-xl border border-border bg-white p-5 transition-colors hover:border-primary/40"
              >
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  {offering?.level ?? "Programme"} · {progress.total} lessons
                </p>
                <h2 className="font-heading mt-2 text-xl font-semibold text-navy">
                  {offering?.title ?? enrollment.courseSlug}
                </h2>
                <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                  {offering?.shortDescription ?? "Open to continue learning."}
                </p>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs">
                    <span>Progress</span>
                    <span>
                      {progress.completed}/{progress.total} · {progress.percent}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
