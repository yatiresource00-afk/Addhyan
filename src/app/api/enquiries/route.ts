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

  const data = parsed.data;
  const record = await fileEnquiryRepository.create({
    type: data.type,
    name: data.name,
    phone: data.phone,
    email: data.email,
    message: data.message,
    courseSlug: data.courseSlug,
    company: data.company,
    city: data.city,
    education: data.education,
    occupation: data.occupation,
    ageGroup: data.ageGroup,
    careerGoal: data.careerGoal,
    interest: data.interest,
    skillLevel: data.skillLevel,
    learningFormat: data.learningFormat,
    budget: data.budget,
    requirement: data.requirement,
  });

  const recommendations =
    data.type === "find-my-course" && data.careerGoal
      ? recommendByCareerGoal(data.careerGoal)
      : [];

  return NextResponse.json({ ok: true, id: record.id, recommendations });
}
