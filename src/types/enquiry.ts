export type EnquiryType =
  | "contact"
  | "counselling"
  | "corporate"
  | "franchise"
  | "find-my-course"
  | "course-interest";

export type StoredEnquiry = {
  id: string;
  type: EnquiryType;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  courseSlug?: string;
  education?: string;
  occupation?: string;
  ageGroup?: string;
  careerGoal?: string;
  interest?: string;
  skillLevel?: string;
  learningFormat?: string;
  budget?: string;
  requirement?: string;
  company?: string;
  city?: string;
};

export type Recommendation = {
  slug: string;
  href: string;
  title: string;
  reason: string;
  primary: boolean;
};
