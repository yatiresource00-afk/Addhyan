import { z } from "zod";

export const enquiryTypes = [
  "contact",
  "counselling",
  "corporate",
  "franchise",
  "find-my-course",
  "course-interest",
] as const;

const requiredName = z.string().trim().min(2, "Enter your name").max(80);
const requiredPhone = z
  .string()
  .trim()
  .min(8, "Enter a valid phone number")
  .max(20)
  .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number");
const requiredEmail = z.string().trim().email("Enter a valid email");

export const enquirySchema = z
  .object({
    type: z.enum(enquiryTypes),
    name: requiredName,
    phone: requiredPhone,
    email: requiredEmail,
    message: z.string().trim().max(2000).optional(),
    courseSlug: z.string().trim().max(80).optional(),
    company: z.string().trim().max(120).optional(),
    city: z.string().trim().max(80).optional(),
    education: z.string().trim().max(80).optional(),
    occupation: z.string().trim().max(80).optional(),
    ageGroup: z.string().trim().max(40).optional(),
    careerGoal: z.string().trim().max(80).optional(),
    interest: z.string().trim().max(80).optional(),
    skillLevel: z.string().trim().max(80).optional(),
    learningFormat: z.string().trim().max(80).optional(),
    budget: z.string().trim().max(80).optional(),
    requirement: z.string().trim().max(2000).optional(),
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((value, ctx) => {
    if (value.type === "find-my-course") {
      (
        [
          "education",
          "occupation",
          "ageGroup",
          "careerGoal",
          "interest",
          "skillLevel",
          "learningFormat",
          "budget",
        ] as const
      ).forEach((field) => {
        if (!value[field]) {
          ctx.addIssue({
            code: "custom",
            message: "This field is required",
            path: [field],
          });
        }
      });
    }
    if (value.type === "corporate" && !value.company) {
      ctx.addIssue({
        code: "custom",
        message: "Enter your organisation name",
        path: ["company"],
      });
    }
  });

export type EnquiryInput = z.infer<typeof enquirySchema>;
