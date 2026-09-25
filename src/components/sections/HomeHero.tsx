import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button-variants";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const homePhotos = Array.from({ length: 32 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return `/home/home-${number}.jpg`;
});

export function HomeHero() {
  const reel = [...homePhotos, ...homePhotos];

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-16 size-72 rounded-full bg-[#0068C8]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 right-0 size-64 rounded-full bg-[#3F8F1F]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 size-56 rounded-full bg-[#E67A00]/10 blur-3xl"
      />
      <Container className="grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div className="animate-fade-up space-y-6">
          <p className="text-sm font-semibold tracking-wide uppercase">
            <span className="text-primary">Learn</span>
            <span className="text-muted-foreground"> · </span>
            <span className="text-green">Grow</span>
            <span className="text-muted-foreground"> · </span>
            <span className="text-orange">Succeed</span>
          </p>
          <h1 className="text-4xl leading-tight font-semibold sm:text-5xl">
            Practical skills for study, work and career growth.
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
            Addhyan Academy helps students, graduates and working professionals
            build workplace confidence and useful AI skills — without a bloated,
            generic “education portal”.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/courses" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
              Explore programmes
            </Link>
            <Link
              href="/#sign-in"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}
            >
              Student / Admin login
            </Link>
          </div>
          <p className="text-muted-foreground text-sm">{site.affiliation}</p>
        </div>
        <div className="relative h-[26rem] overflow-hidden rounded-2xl sm:h-[32rem]">
          <div className="animate-photo-run flex flex-col gap-3">
            {reel.map((src, index) => (
              <Image
                key={`${src}-${index}`}
                src={src}
                alt="Addhyan Academy students and mentors"
                width={960}
                height={640}
                priority={index < 2}
                className="h-52 w-full rounded-xl object-cover sm:h-60"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
