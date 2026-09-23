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
  const studentPassword =
    process.env.STUDENT_SEED_PASSWORD || "Student@Addhyan1";

  const approvedStaff = [
    {
      name: "Pulak",
      email: "pulak@yatiresource.com",
      password: process.env.DIRECTOR_SEED_PASSWORD || "Pulak@Yati2026",
      role: "DIRECTOR",
    },
    {
      name: "Sales",
      email: "sales@yatiresource.com",
      password: process.env.SALES_SEED_PASSWORD || "Sales@Yati2026",
      role: "MODERATOR",
    },
    {
      name: "Accounts",
      email: "accounts@yatiresource.com",
      password: process.env.ACCOUNTS_SEED_PASSWORD || "Accounts@Yati2026",
      role: "MODERATOR",
    },
  ];

  await prisma.user.updateMany({
    where: {
      role: { in: ["DIRECTOR", "MODERATOR"] },
      email: { notIn: approvedStaff.map((row) => row.email) },
    },
    data: { role: "STUDENT" },
  });

  for (const staff of approvedStaff) {
    const existing = await prisma.user.findUnique({ where: { email: staff.email } });
    if (existing) {
      await prisma.user.update({
        where: { email: staff.email },
        data: { name: staff.name, role: staff.role },
      });
    } else {
      await prisma.user.create({
        data: {
          name: staff.name,
          email: staff.email,
          role: staff.role,
          passwordHash: await hashPassword(staff.password),
        },
      });
      console.log(`  Created ${staff.role}: ${staff.email} / ${staff.password}`);
    }
  }

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
    contact_email: "enquiry@addhyanacademy.com",
    contact_phone: "+91 00000 00000",
    contact_address: "Address to be confirmed",
    announcement: "Welcome to Addhyan Academy learning portal.",
    site_tagline: "Learn • Grow • Succeed",
  };

  for (const [key, value] of Object.entries(defaults)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: key === "contact_email" ? { value } : {},
      create: { key, value },
    });
  }

  console.log("Seed complete:");
  console.log("  Staff emails: pulak@yatiresource.com (Director), sales@yatiresource.com, accounts@yatiresource.com (Moderators)");
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
