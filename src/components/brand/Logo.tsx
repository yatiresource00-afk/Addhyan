import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)}>
      <Image
        src={site.logo}
        alt="Addhyan Academy"
        width={200}
        height={200}
        priority={priority}
        className="h-12 w-auto sm:h-14"
      />
    </Link>
  );
}
