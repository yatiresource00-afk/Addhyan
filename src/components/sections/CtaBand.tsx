import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaBand({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="bg-navy text-white">
      <Container className="flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
          <p className="text-white/80 leading-relaxed">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={primaryHref}
            className={cn(buttonVariants({ size: "lg" }), "h-11 bg-white px-5 text-navy hover:bg-white/90")}
          >
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 border-white/40 px-5 bg-transparent text-white hover:bg-white/10 hover:text-white"
              )}
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
