import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { nav, site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-white">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-muted-foreground max-w-xs text-sm">
            Practical career education from {site.name}, {site.affiliation.toLowerCase()}.
          </p>
          <p className="text-navy text-sm font-medium">{site.tagline}</p>
        </div>
        <FooterColumn title="Programmes" links={nav.footer.programmes} />
        <FooterColumn title="Services" links={nav.footer.services} />
        <FooterColumn title="Academy" links={nav.footer.academy} />
      </Container>
      <div className="border-t border-border">
        <Container className="text-muted-foreground flex flex-col gap-2 py-6 text-sm sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {site.name}.
          </p>
          <p>{site.contact.note}</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-navy mb-3 text-sm font-semibold">{title}</p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-muted-foreground hover:text-navy text-sm">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
