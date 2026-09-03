import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/sections/SectionHeader";
import { ComingSoonNotice } from "@/components/states/ComingSoonNotice";
import { logoutAction } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Your account",
  description: "Your Addhyan Academy account.",
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="py-12 sm:py-16">
      <Container className="max-w-2xl space-y-8">
        <PageHeader
          eyebrow="Signed in"
          title={`Hello, ${user.name}`}
          description="Your account works on this site. Paid enrolment, My Courses and the lesson player are coming soon."
        />
        <div className="rounded-xl border border-border bg-white p-5 text-sm">
          <p>
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p className="mt-2">
            <span className="font-medium">Email:</span> {user.email}
          </p>
        </div>
        <ComingSoonNotice
          title="My Courses and settings coming soon"
          description="Progress, paid access, video lessons and account settings need enrolment and the learning platform. Those phases are not open yet."
        />
        <form action={logoutAction}>
          <Button type="submit" variant="outline" className="h-11 px-5">
            Sign out
          </Button>
        </form>
      </Container>
    </div>
  );
}
