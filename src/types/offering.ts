export type OfferingCategory =
  | "paid"
  | "free"
  | "service"
  | "coming-soon"
  | "partnership";

export type OfferingType = "self-paced" | "live" | "enquiry" | "booking";

export type OfferingStatus = "published" | "coming-soon";

export type CtaType = "enroll" | "enquire" | "book" | "coming-soon" | "explore";

export type OfferingLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "All levels";

export type CourseModule = {
  id: string;
  title: string;
  lessons: string[];
};

export type OfferingSeo = {
  title: string;
  description: string;
};

export type Offering = {
  id: string;
  title: string;
  slug: string;
  href: string;
  category: OfferingCategory;
  type: OfferingType;
  price: number | null;
  currency: "INR";
  gstIncluded: boolean;
  shortDescription: string;
  description: string;
  positioning: string;
  valueProposition: string;
  targetAudience: string[];
  level: OfferingLevel;
  duration: string;
  modules: CourseModule[];
  outcomes: string[];
  features: string[];
  projects: string[];
  practicalActivities: string[];
  certificate: { included: boolean; summary: string };
  instructor?: { name: string; role: string };
  thumbnail: string;
  status: OfferingStatus;
  ctaType: CtaType;
  ctaLabel: string;
  faqs: { question: string; answer: string }[];
  accent: "blue" | "green" | "orange" | "navy";
  seo: OfferingSeo;
};

export function lessonCount(offering: Offering): number {
  return offering.modules.reduce((sum, module) => sum + module.lessons.length, 0);
}
