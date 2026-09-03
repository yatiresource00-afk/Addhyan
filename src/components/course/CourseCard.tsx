import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { lessonCount, type Offering } from "@/types/offering";
import { formatPriceInr } from "@/lib/format";
import { cn } from "@/lib/utils";

function statusLabel(offering: Offering) {
  if (offering.status === "coming-soon") return "Coming soon";
  if (offering.category === "free") return "Free";
  if (offering.category === "service") return "Service";
  if (offering.category === "partnership") return "Partnership";
  return "Paid";
}

export function CourseCard({ offering }: { offering: Offering }) {
  const lessons = lessonCount(offering);

  return (
    <Card
      className={cn(
        "h-full py-0 transition-transform duration-200 hover:-translate-y-0.5 hover:ring-primary/40",
        "motion-reduce:transform-none"
      )}
    >
      <Link href={offering.href} className="flex h-full flex-col">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={offering.thumbnail}
            alt=""
            fill
            unoptimized
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
        <CardHeader className="gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{statusLabel(offering)}</Badge>
            {offering.intake === "coming-soon" && offering.status !== "coming-soon" ? (
              <Badge variant="outline">{offering.intakeLabel}</Badge>
            ) : null}
            <Badge variant="outline">{offering.level}</Badge>
          </div>
          <CardTitle className="font-heading text-lg leading-snug">
            {offering.title}
          </CardTitle>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {offering.shortDescription}
          </p>
        </CardHeader>
        <CardContent className="text-muted-foreground mt-auto space-y-2 text-sm">
          <p>{offering.targetAudience[0]}</p>
          <p>
            {offering.duration}
            {lessons > 0 ? ` · ${lessons} lessons` : ""}
          </p>
          <PriceLine offering={offering} />
        </CardContent>
        <CardFooter className="text-primary pb-5 text-sm font-medium">
          {offering.ctaLabel}
        </CardFooter>
      </Link>
    </Card>
  );
}

export function PriceLine({ offering }: { offering: Offering }) {
  if (offering.price === 0) return <p className="text-green font-semibold">Free</p>;
  if (offering.price == null) {
    return <p className="font-medium">Fee to be confirmed</p>;
  }
  return (
    <p className="text-navy font-semibold">
      {formatPriceInr(offering.price)}
      {offering.gstIncluded ? (
        <span className="text-muted-foreground ml-1 font-normal">incl. GST</span>
      ) : null}
    </p>
  );
}
