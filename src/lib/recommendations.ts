import { getOfferingBySlug } from "@/data/offerings";
import {
  recommendationRules,
  type CareerGoal,
} from "@/data/recommendation-rules";
import type { Recommendation } from "@/types/enquiry";

export function recommendByCareerGoal(careerGoal: string): Recommendation[] {
  const match = recommendationRules.find(
    (rule) => rule.careerGoal === (careerGoal as CareerGoal)
  );
  if (!match) return [];

  const offering = getOfferingBySlug(match.offeringSlug);
  if (!offering) return [];

  const primary: Recommendation = {
    slug: offering.slug,
    href: offering.href,
    title: offering.title,
    reason: match.reason,
    primary: true,
  };

  const related: Recommendation[] = [];
  if (offering.slug === "jrp") {
    const adv = getOfferingBySlug("jrp-advance");
    if (adv) {
      related.push({
        slug: adv.slug,
        href: adv.href,
        title: adv.title,
        reason: "If you already want long-term growth rather than first-job basics, compare JRP Advance.",
        primary: false,
      });
    }
  }
  if (offering.slug === "basic-ai") {
    const adv = getOfferingBySlug("advanced-ai");
    if (adv) {
      related.push({
        slug: adv.slug,
        href: adv.href,
        title: adv.title,
        reason: "Once the basics are comfortable, Advanced AI covers workflows and a portfolio project.",
        primary: false,
      });
    }
  }

  return [primary, ...related];
}
