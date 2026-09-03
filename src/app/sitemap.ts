import type { MetadataRoute } from "next";
import { offerings } from "@/data/offerings";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/courses",
    "/about",
    "/faq",
    "/contact",
    "/terms",
    "/privacy",
    "/career-counselling",
    "/corporate-training",
    "/franchise",
    "/find-my-course",
    "/csr",
  ];
  const offeringPaths = offerings.map((item) => item.href);
  const unique = [...new Set([...staticPaths, ...offeringPaths])];
  return unique.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
