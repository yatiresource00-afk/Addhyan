import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";
import { fileEnquiryRepository } from "@/lib/enquiries/store";
import { allowRequest } from "@/lib/rate-limit";
import { recommendByCareerGoal } from "@/lib/recommendations";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowRequest(ip)) {
    return NextResponse.json(
      { error: "Too many enquiries. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fieldErrors },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { website: _honeypot, ...rest } = parsed.data;
  const record = await fileEnquiryRepository.create({
    type: rest.type,
    name: rest.name,
    phone: rest.phone,
    email: rest.email,
    message: rest.message,
    courseSlug: rest.courseSlug,
    company: rest.company,
    city: rest.city,
    education: rest.education,
    occupation: rest.occupation,
    ageGroup: rest.ageGroup,
    careerGoal: rest.careerGoal,
    interest: rest.interest,
    skillLevel: rest.skillLevel,
    learningFormat: rest.learningFormat,
    budget: rest.budget,
    requirement: rest.requirement,
  });

  const recommendations =
    rest.type === "find-my-course" && rest.careerGoal
      ? recommendByCareerGoal(rest.careerGoal)
      : [];

  return NextResponse.json({ ok: true, id: record.id, recommendations });
}
