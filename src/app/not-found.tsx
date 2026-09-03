import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground mx-auto mt-3 max-w-md">
        That address is not a published Addhyan Academy page.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex h-11 px-5")}>
        Back to home
      </Link>
    </Container>
  );
}
