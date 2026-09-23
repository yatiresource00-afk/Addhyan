import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/auth/actions";
import { requireStaff } from "@/lib/auth/session";
import { roleLabel } from "@/lib/auth/roles";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/enrollments", label: "Enrolments" },
  { href: "/admin/lessons", label: "Video lessons" },
  { href: "/admin/images", label: "Images" },
  { href: "/admin/settings", label: "Site settings" },
];

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireStaff();
  if (!user) redirect("/admin/login");

  return (
    <div className="bg-canvas min-h-full">
      <div className="border-b border-border bg-navy text-white">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <p className="text-xs tracking-wide text-white/70 uppercase">Administration</p>
            <p className="font-heading text-lg font-semibold">
              {user.name} · {roleLabel(user.role)}
            </p>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="secondary" className="h-10 px-4">
              Sign out
            </Button>
          </form>
        </Container>
      </div>
      <Container className="grid gap-8 py-8 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="Administration" className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:bg-white hover:text-navy block rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="min-w-0">{children}</div>
      </Container>
    </div>
  );
}
