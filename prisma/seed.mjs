import { createHash, randomBytes } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

const PLACEHOLDER_VIDEO =
  "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0";

const seedLessons = [
  {
    courseSlug: "jrp",
    moduleTitle: "Professional presence",
    title: "Professional etiquette at work",
    description: "How to show up professionally on day one.",
    sortOrder: 1,
  },
  {
    courseSlug: "jrp",
    moduleTitle: "Professional presence",
    title: "Grooming and first impressions",
    description: "Practical grooming standards for workplace settings.",
    sortOrder: 2,
  },
  {
    courseSlug: "jrp",
    moduleTitle: "Communication that lands",
    title: "Clear spoken communication",
    description: "Speak clearly in meetings and interviews.",
    sortOrder: 3,
  },
  {
    courseSlug: "jrp",
    moduleTitle: "Communication that lands",
    title: "Email writing for the workplace",
    description: "Write concise, professional emails.",
    sortOrder: 4,
  },
  {
    courseSlug: "basic-ai",
    moduleTitle: "AI foundations",
    title: "What AI can (and cannot) do at work",
    description: "A practical introduction to workplace AI tools.",
    sortOrder: 1,
  },
  {
    courseSlug: "basic-ai",
    moduleTitle: "Prompting basics",
    title: "Writing useful prompts",
    description: "Structure prompts for clearer AI answers.",
    sortOrder: 2,
  },
];

async function upsertUser({ name, email, phone, password, role }) {
  const passwordHash = await hashPassword(password);
  return prisma.user.upsert({
    where: { email },
    update: { name, phone, passwordHash, role },
    create: { name, email, phone, passwordHash, role },
  });
}

async function main() {
  const directorPassword =
    process.env.ADMIN_SEED_PASSWORD || "Director@Addhyan1";
  const moderatorPassword =
    process.env.MODERATOR_SEED_PASSWORD || "Moderator@Addhyan1";
  const studentPassword =
    process.env.STUDENT_SEED_PASSWORD || "Student@Addhyan1";

  const director = await upsertUser({
    name: "Academy Director",
    email: "director@addhyan.academy",
    phone: "+919900000001",
    password: directorPassword,
    role: "DIRECTOR",
  });

  const moderator = await upsertUser({
    name: "Programme Moderator",
    email: "moderator@addhyan.academy",
    phone: "+919900000002",
    password: moderatorPassword,
    role: "MODERATOR",
  });

  const student = await upsertUser({
    name: "Demo Student",
    email: "student@addhyan.academy",
    phone: "+919900000003",
    password: studentPassword,
    role: "STUDENT",
  });

  const existingLessons = await prisma.courseLesson.count();
  if (existingLessons === 0) {
    for (const lesson of seedLessons) {
      await prisma.courseLesson.create({
        data: {
          ...lesson,
          videoUrl: PLACEHOLDER_VIDEO,
          durationMin: 8 + lesson.sortOrder,
          published: true,
        },
      });
    }
  }

  await prisma.enrollment.upsert({
    where: {
      userId_courseSlug: { userId: student.id, courseSlug: "jrp" },
    },
    update: { status: "active" },
    create: { userId: student.id, courseSlug: "jrp", status: "active" },
  });

  await prisma.enrollment.upsert({
    where: {
      userId_courseSlug: { userId: student.id, courseSlug: "basic-ai" },
    },
    update: { status: "active" },
    create: {
      userId: student.id,
      courseSlug: "basic-ai",
      status: "active",
    },
  });

  const defaults = {
    contact_email: "hello@addhyan.academy",
    contact_phone: "+91 00000 00000",
    contact_address: "Address to be confirmed",
    announcement: "Welcome to Addhyan Academy learning portal.",
    site_tagline: "Learn • Grow • Succeed",
  };

  for (const [key, value] of Object.entries(defaults)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }

  console.log("Seed complete:");
  console.log(`  Director:  ${director.email} / ${directorPassword}`);
  console.log(`  Moderator: ${moderator.email} / ${moderatorPassword}`);
  console.log(`  Student:   ${student.email} / ${studentPassword}`);
  console.log(
    "  OTP tip: set RESEND_API_KEY / TWILIO_* for live delivery; otherwise OTP is logged and shown in dev."
  );
  // silence unused import warning in some tooling
  void createHash;
  void randomBytes;
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
