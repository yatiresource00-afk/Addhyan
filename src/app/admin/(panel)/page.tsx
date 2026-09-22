import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminHomePage() {
  const [users, enrollments, lessons, students] = await Promise.all([
    prisma.user.count(),
    prisma.enrollment.count(),
    prisma.courseLesson.count(),
    prisma.user.count({ where: { role: "STUDENT" } }),
  ]);

  const cards = [
    { label: "Users", value: users, href: "/admin/users" },
    { label: "Students", value: students, href: "/admin/users" },
    { label: "Enrolments", value: enrollments, href: "/admin/enrollments" },
    { label: "Video lessons", value: lessons, href: "/admin/lessons" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Control centre</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Moderators and Directors can manage users, enrolments, video lessons and public site
          settings from here.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-border bg-white p-5 transition-colors hover:border-primary/40"
          >
            <p className="text-muted-foreground text-sm">{card.label}</p>
            <p className="font-heading mt-2 text-3xl font-semibold text-navy">{card.value}</p>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/admin/users" className={cn(buttonVariants(), "h-11 px-5")}>
          Manage users
        </Link>
        <Link
          href="/admin/lessons"
          className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}
        >
          Manage lessons
        </Link>
        <Link
          href="/admin/settings"
          className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}
        >
          Site settings
        </Link>
      </div>
    </div>
  );
}
