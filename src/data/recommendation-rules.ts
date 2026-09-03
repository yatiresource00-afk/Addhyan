export type CareerGoal =
  | "job-preparation"
  | "career-growth"
  | "ai-beginner"
  | "ai-existing"
  | "career-uncertainty"
  | "company-training";

export type RecommendationRule = {
  id: string;
  careerGoal: CareerGoal;
  offeringSlug: string;
  reason: string;
};

export const recommendationRules: RecommendationRule[] = [
  {
    id: "company-training",
    careerGoal: "company-training",
    offeringSlug: "corporate-training",
    reason: "Company training requirement maps to Corporate Training, which is scoped for organisations.",
  },
  {
    id: "career-uncertainty",
    careerGoal: "career-uncertainty",
    offeringSlug: "career-counselling",
    reason: "When the next step is unclear, Career Counselling is the right first conversation.",
  },
  {
    id: "career-growth",
    careerGoal: "career-growth",
    offeringSlug: "jrp-advance",
    reason: "Long-term growth, workplace excellence and a 90-day plan sit in JRP Advance.",
  },
  {
    id: "job-preparation",
    careerGoal: "job-preparation",
    offeringSlug: "jrp",
    reason: "First-job readiness — etiquette, communication and interview fundamentals — is JRP.",
  },
  {
    id: "ai-existing",
    careerGoal: "ai-existing",
    offeringSlug: "advanced-ai",
    reason: "Existing AI knowledge maps to Advanced AI: workflows, automation and a portfolio project.",
  },
  {
    id: "ai-beginner",
    careerGoal: "ai-beginner",
    offeringSlug: "basic-ai",
    reason: "AI beginners start with Basic AI: tools, prompting and everyday use.",
  },
];

export const findMyCourseOptions = {
  education: [
    "Class 10–12",
    "Undergraduate",
    "Graduate",
    "Postgraduate",
    "Other",
  ],
  occupation: [
    "Student",
    "Fresher / job seeker",
    "Working professional",
    "Business owner",
    "HR / L&D / manager",
    "Other",
  ],
  ageGroup: ["Under 18", "18–24", "25–34", "35–44", "45+"],
  careerGoal: [
    { value: "job-preparation", label: "Job preparation / first job" },
    { value: "career-growth", label: "Career growth in my current or next role" },
    { value: "ai-beginner", label: "I am new to AI and want to start" },
    { value: "ai-existing", label: "I already use AI and want to go further" },
    { value: "career-uncertainty", label: "I am unsure what path to take" },
    { value: "company-training", label: "Training for a company or team" },
  ],
  interest: [
    "Workplace skills and professionalism",
    "Artificial intelligence",
    "Career counselling",
    "Not sure yet",
  ],
  skillLevel: ["Beginner", "Some experience", "Confident / advanced"],
  learningFormat: ["Self-paced", "Guided / mentored", "Live or in-person", "Not sure"],
  budget: ["Under ₹1,000", "₹1,000–₹5,000", "₹5,000–₹20,000", "Above ₹20,000", "Need guidance"],
} as const;
