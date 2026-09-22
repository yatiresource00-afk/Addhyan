import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { offerings } from "@/data/offerings";
import { EnrollForm, RevokeEnrollmentButton } from "@/components/admin/EnrollmentForms";
import { offeringBySlug } from "@/lib/learning/queries";

export const metadata: Metadata = {
  title: "Enrolments · Administration",
  robots: { index: false, follow: false },
};

export default async function AdminEnrollmentsPage() {
  const [students, enrollments] = await Promise.all([
    prisma.user.findMany({
      where: { role: "STUDENT" },
      orderBy: { name: "asc" },
      select: { id: true, name: true, email: true },
    }),
    prisma.enrollment.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  const courses = offerings
    .filter((o) => o.category === "paid" || o.category === "free")
    .map((o) => ({ slug: o.slug, title: o.title }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Enrolments</h1>
        <p className="text-muted-foreground mt-2">
          Grant students access to courses so they can open video modules and track progress.
        </p>
      </div>
      <EnrollForm students={students} courses={courses} />
      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-muted/60 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Student</th>
              <th className="px-4 py-3 font-medium">Course</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((row) => (
              <tr key={row.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="font-medium text-navy">{row.user.name}</div>
                  <div className="text-muted-foreground text-xs">{row.user.email}</div>
                </td>
                <td className="px-4 py-3">
                  {offeringBySlug(row.courseSlug)?.title ?? row.courseSlug}
                </td>
                <td className="px-4 py-3 capitalize">{row.status}</td>
                <td className="px-4 py-3">
                  <RevokeEnrollmentButton enrollmentId={row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
