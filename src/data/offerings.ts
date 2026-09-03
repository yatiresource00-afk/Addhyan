import type { Offering } from "@/types/offering";
import { lessonCount } from "@/types/offering";

export const offerings: Offering[] = [
  {
    id: "jrp",
    title: "JRP – Job Ready Program",
    slug: "jrp",
    href: "/courses/jrp",
    category: "paid",
    type: "self-paced",
    price: 999,
    currency: "INR",
    gstIncluded: true,
    positioning: "Become Job Ready",
    shortDescription:
      "Workplace etiquette, communication, grooming and interview basics so you can start a job with confidence.",
    description:
      "JRP is Addhyan’s entry programme for students, graduates and freshers who need practical workplace skills — not another theory-heavy course. It covers how to show up, communicate, write professionally and handle the first months of work.",
    valueProposition:
      "Build the everyday professional habits that help you get noticed for the right reasons in your first role.",
    targetAudience: [
      "Class 10–12 students exploring work",
      "College students and undergraduates",
      "Graduates and freshers",
      "First-time job seekers",
    ],
    level: "Beginner",
    duration: "Self-paced",
    modules: [
      {
        id: "jrp-m1",
        title: "Professional presence",
        lessons: [
          "Professional etiquette at work",
          "Grooming and first impressions",
          "Workplace behaviour and respect",
        ],
      },
      {
        id: "jrp-m2",
        title: "Communication that lands",
        lessons: [
          "Clear spoken communication",
          "Email writing for the workplace",
          "Listening and responding professionally",
        ],
      },
      {
        id: "jrp-m3",
        title: "Habits that keep you employable",
        lessons: [
          "Time management on the job",
          "Professional habits and reliability",
          "Personality development for work",
        ],
      },
      {
        id: "jrp-m4",
        title: "Interviews and workplace confidence",
        lessons: [
          "Interview fundamentals",
          "Answering common first-job questions",
          "Building workplace confidence",
        ],
      },
    ],
    outcomes: [
      "Present yourself professionally in person and on email",
      "Follow workplace etiquette and expected behaviour",
      "Manage time and basic professional habits",
      "Handle interview fundamentals with more confidence",
    ],
    features: [
      "Practical workplace scenarios",
      "Email and communication practice",
      "Interview fundamentals",
      "Certificate of completion from Addhyan Academy",
    ],
    projects: [],
    practicalActivities: [
      "Rewrite a casual message as a professional email",
      "Practise a short self-introduction for interviews",
      "Checklist for the first week at work",
    ],
    certificate: {
      included: true,
      summary: "Certificate of completion issued by Addhyan Academy.",
    },
    thumbnail: "/courses/jrp.svg",
    status: "published",
    intake: "coming-soon",
    intakeLabel: "Enrolment coming soon",
    ctaType: "enroll",
    ctaLabel: "View programme",
    accent: "blue",
    faqs: [
      {
        question: "Who should take JRP?",
        answer:
          "Students, graduates and freshers who want to feel prepared for a first job — especially around behaviour, communication and interviews.",
      },
      {
        question: "How is JRP different from JRP Advance?",
        answer:
          "JRP focuses on becoming job-ready for entry into work. JRP Advance is a deeper career-growth programme covering strategy, leadership, interviews at a higher level, and a 90-day plan.",
      },
      {
        question: "Does the fee include GST?",
        answer: "Yes. The listed price of ₹999 includes GST.",
      },
    ],
    seo: {
      title: "JRP – Job Ready Program | Addhyan Academy",
      description:
        "Become job ready with Addhyan’s JRP: professional etiquette, communication, grooming, email writing and interview fundamentals. ₹999 including GST.",
    },
  },
  {
    id: "jrp-advance",
    title: "JRP Advance – Career Accelerator & Workplace Excellence",
    slug: "jrp-advance",
    href: "/courses/jrp-advance",
    category: "paid",
    type: "enquiry",
    price: 19999,
    currency: "INR",
    gstIncluded: true,
    positioning: "Become Career Ready for Long-Term Growth",
    shortDescription:
      "Career strategy, workplace excellence, interview mastery and a 90-day growth plan for people who want to progress — not only get hired.",
    description:
      "JRP Advance is for learners who already want a job or have one, and now need a structured way to grow: skill-gap analysis, communication mastery, leadership, emotional intelligence, personal branding, interviews, and workplace digital skills including AI productivity.",
    valueProposition:
      "Move from “I got a job” to “I can perform, get recognised and grow” with mentoring-style practice, simulations and a 90-day plan.",
    targetAudience: [
      "Graduates aiming for faster career growth",
      "Working professionals who feel stuck",
      "Job seekers targeting stronger roles",
      "People preparing for promotion or a career shift",
    ],
    level: "Intermediate",
    duration: "Guided programme with a 90-day career plan",
    modules: [
      {
        id: "jrpa-m1",
        title: "Career strategy",
        lessons: [
          "Skill-gap analysis",
          "Personal career roadmap",
          "Choosing a direction you can sustain",
        ],
      },
      {
        id: "jrpa-m2",
        title: "Workplace excellence",
        lessons: [
          "Professional communication mastery",
          "Productivity and problem solving",
          "Analytical thinking at work",
          "Leadership and emotional intelligence",
        ],
      },
      {
        id: "jrpa-m3",
        title: "Career branding",
        lessons: [
          "Resume that reflects impact",
          "LinkedIn positioning",
          "Interview mastery",
          "Salary and promotion conversations",
        ],
      },
      {
        id: "jrpa-m4",
        title: "Modern workplace skills",
        lessons: [
          "Workplace digital skills",
          "AI productivity for professionals",
        ],
      },
      {
        id: "jrpa-m5",
        title: "Practice and 90-day plan",
        lessons: [
          "Workplace simulations",
          "Mock interviews",
          "Individual feedback",
          "Portfolio or capstone",
          "90-day growth plan",
        ],
      },
    ],
    outcomes: [
      "A clear career roadmap based on your skill gaps",
      "Stronger workplace communication and problem solving",
      "A sharper resume, LinkedIn profile and interview approach",
      "A 90-day plan you can actually follow",
    ],
    features: [
      "Mentoring-style feedback",
      "Mock interviews and workplace simulations",
      "Portfolio / capstone support",
      "90-day career plan",
      "Certificate of completion from Addhyan Academy",
    ],
    projects: [
      "Personal skill-gap map and career roadmap",
      "Updated professional profile set (resume + LinkedIn narrative)",
      "Capstone: 90-day growth plan with measurable actions",
    ],
    practicalActivities: [
      "Mock interviews with feedback",
      "Workplace simulations",
      "Salary and promotion conversation practice",
    ],
    certificate: {
      included: true,
      summary: "Certificate of completion issued by Addhyan Academy.",
    },
    thumbnail: "/courses/jrp-advance.svg",
    status: "published",
    intake: "coming-soon",
    intakeLabel: "Enrolment coming soon",
    ctaType: "enroll",
    ctaLabel: "View programme",
    accent: "orange",
    faqs: [
      {
        question: "Is this the same as JRP?",
        answer:
          "No. JRP is the job-readiness foundation. JRP Advance is a career accelerator with strategy, simulations, mock interviews and a 90-day plan.",
      },
      {
        question: "Does the fee include GST?",
        answer: "Yes. The listed price of ₹19,999 includes GST.",
      },
      {
        question: "Can I start without a current job?",
        answer:
          "Yes. The programme is relevant to job seekers targeting stronger roles as well as working professionals.",
      },
    ],
    seo: {
      title: "JRP Advance | Career Accelerator | Addhyan Academy",
      description:
        "JRP Advance (₹19,999 incl. GST): career strategy, workplace excellence, interview mastery, AI productivity and a 90-day growth plan.",
    },
  },
  {
    id: "basic-ai",
    title: "Basic AI",
    slug: "basic-ai",
    href: "/courses/basic-ai",
    category: "paid",
    type: "self-paced",
    price: 999,
    currency: "INR",
    gstIncluded: true,
    positioning: "Learn AI. Use AI. Work Smarter.",
    shortDescription:
      "AI fundamentals, everyday tools and prompt engineering for study, research, office work and interviews — used responsibly.",
    description:
      "Basic AI is a practical introduction for students and professionals who want to use current AI tools well. You will learn what the major tools do, how to prompt them, and how to apply them to study, research, office tasks, presentations and job search — plus where not to use them.",
    valueProposition:
      "Stop guessing at AI tools. Learn a responsible, repeatable way to use them for study and work.",
    targetAudience: [
      "Students who want AI for study and research",
      "Freshers preparing resumes and interviews",
      "Office beginners using documents and presentations",
      "Anyone new to AI tools",
    ],
    level: "Beginner",
    duration: "Self-paced",
    modules: [
      {
        id: "bai-m1",
        title: "AI fundamentals",
        lessons: [
          "What AI can and cannot do",
          "Major AI tools you will actually meet",
          "Responsible and ethical use",
        ],
      },
      {
        id: "bai-m2",
        title: "Prompt engineering basics",
        lessons: [
          "Writing clear prompts",
          "Iterating when the output is weak",
          "Checking facts and avoiding blind copy-paste",
        ],
      },
      {
        id: "bai-m3",
        title: "AI for study and research",
        lessons: [
          "Using AI to understand a topic",
          "Research support without outsourcing your thinking",
        ],
      },
      {
        id: "bai-m4",
        title: "AI at work",
        lessons: [
          "Office writing and email support",
          "Presentations",
          "Resume and interview preparation",
          "Basic data work",
        ],
      },
    ],
    outcomes: [
      "Explain AI tools in plain language",
      "Write better prompts for study and work tasks",
      "Use AI on documents, presentations and job-search materials",
      "Know the limits and risks of AI output",
    ],
    features: [
      "Tool-agnostic fundamentals",
      "Prompt practice on real student and office tasks",
      "Responsible AI guidance",
      "Certificate of completion from Addhyan Academy",
    ],
    projects: [],
    practicalActivities: [
      "Prompt a study summary you then verify",
      "Draft a professional email with AI, then edit it",
      "Improve a resume bullet with human judgement",
    ],
    certificate: {
      included: true,
      summary: "Certificate of completion issued by Addhyan Academy.",
    },
    thumbnail: "/courses/basic-ai.svg",
    status: "published",
    intake: "coming-soon",
    intakeLabel: "Enrolment coming soon",
    ctaType: "enroll",
    ctaLabel: "View programme",
    accent: "green",
    faqs: [
      {
        question: "Do I need a technical background?",
        answer: "No. Basic AI is designed for beginners.",
      },
      {
        question: "How is this different from Advanced AI?",
        answer:
          "Basic AI covers fundamentals and everyday use. Advanced AI covers workflows, automation, agents, no-code builds and a portfolio project.",
      },
      {
        question: "Does the fee include GST?",
        answer: "Yes. The listed price of ₹999 includes GST.",
      },
    ],
    seo: {
      title: "Basic AI Course | Addhyan Academy",
      description:
        "Learn AI fundamentals, popular tools and prompt engineering for study, office work and interviews. ₹999 including GST.",
    },
  },
  {
    id: "advanced-ai",
    title: "Advanced AI",
    slug: "advanced-ai",
    href: "/courses/advanced-ai",
    category: "paid",
    type: "self-paced",
    price: 2999,
    currency: "INR",
    gstIncluded: true,
    positioning:
      "Build AI-Powered Workflows. Solve Real Problems. Build Your Portfolio.",
    shortDescription:
      "Advanced prompting, AI workflows, automation (Make, Zapier, n8n), agents, security and a portfolio project.",
    description:
      "Advanced AI is for learners who already know the basics and want to build useful systems: deeper research, data analysis, custom assistants, no-code / vibe coding, automation tools (Make, Zapier, n8n), AI agents, and security-aware professional use — ending in a portfolio project.",
    valueProposition:
      "Go beyond chat. Design workflows that save time, handle real work, and can be shown to an employer.",
    targetAudience: [
      "People who already use AI tools and want more",
      "Working professionals automating office work",
      "Students building a practical AI portfolio",
      "Career switchers exploring AI-enabled roles",
    ],
    level: "Intermediate",
    duration: "Self-paced with a portfolio project",
    modules: [
      {
        id: "aai-m1",
        title: "Advanced prompting and research",
        lessons: [
          "Advanced prompting patterns",
          "Deep research workflows",
          "Data analysis with AI support",
        ],
      },
      {
        id: "aai-m2",
        title: "Professional applications",
        lessons: [
          "AI workflows for real work",
          "Professional use cases",
          "Custom AI assistants",
        ],
      },
      {
        id: "aai-m3",
        title: "Automation and no-code",
        lessons: [
          "Automation thinking",
          "Make",
          "Zapier",
          "n8n",
          "No-code and vibe coding",
        ],
      },
      {
        id: "aai-m4",
        title: "Agents, security and portfolio",
        lessons: [
          "AI agents — what they are and when to use them",
          "AI security and safe handling of information",
          "Portfolio project",
        ],
      },
    ],
    outcomes: [
      "Design multi-step AI workflows for a real problem",
      "Use automation tools such as Make, Zapier or n8n at a practical level",
      "Build or configure a custom assistant",
      "Ship a portfolio project you can explain in interviews",
    ],
    features: [
      "Workflow and automation focus",
      "Coverage of Make, Zapier and n8n",
      "AI agents and security awareness",
      "Portfolio project",
      "Certificate of completion from Addhyan Academy",
    ],
    projects: [
      "End-to-end AI workflow for a study or office problem",
      "Portfolio project documenting the problem, tools and result",
    ],
    practicalActivities: [
      "Build a no-code automation",
      "Configure a custom assistant for a defined task",
      "Security checklist for AI at work",
    ],
    certificate: {
      included: true,
      summary: "Certificate of completion issued by Addhyan Academy.",
    },
    thumbnail: "/courses/advanced-ai.svg",
    status: "published",
    intake: "coming-soon",
    intakeLabel: "Enrolment coming soon",
    ctaType: "enroll",
    ctaLabel: "View programme",
    accent: "navy",
    faqs: [
      {
        question: "Should I take Basic AI first?",
        answer:
          "If you are new to AI tools and prompting, start with Basic AI. If you already use AI regularly, Advanced AI is the better fit.",
      },
      {
        question: "Does the fee include GST?",
        answer: "Yes. The listed price of ₹2,999 includes GST.",
      },
    ],
    seo: {
      title: "Advanced AI Course | Addhyan Academy",
      description:
        "Build AI workflows, automations, assistants and a portfolio project. Includes Make, Zapier, n8n, agents and AI security. ₹2,999 including GST.",
    },
  },
  {
    id: "career-counselling",
    title: "Career Counselling",
    slug: "career-counselling",
    href: "/career-counselling",
    category: "service",
    type: "booking",
    price: 999,
    currency: "INR",
    gstIncluded: true,
    positioning: "Get clarity before you choose a path",
    shortDescription:
      "A booked counselling conversation to understand your options — not a self-paced video course.",
    description:
      "Career Counselling is a one-to-one style booking with Addhyan. It is for learners who are unsure which programme or career direction fits them. It is not a recorded course with modules you complete alone.",
    valueProposition:
      "Talk through education, skills and goals with Addhyan before you spend on the wrong programme.",
    targetAudience: [
      "Students unsure what to study or skill-up in",
      "Graduates choosing between jobs and courses",
      "Working professionals considering a change",
    ],
    level: "All levels",
    duration: "Booked session",
    modules: [],
    outcomes: [
      "Clearer view of options that match your situation",
      "A recommended next step (programme, skill focus, or further counselling)",
    ],
    features: [
      "Enquiry and booking flow",
      "Guidance based on your education and goals",
      "₹999 including GST",
    ],
    projects: [],
    practicalActivities: [],
    certificate: {
      included: false,
      summary: "Counselling is a booked service, not a certified course.",
    },
    thumbnail: "/courses/counselling.svg",
    status: "published",
    intake: "coming-soon",
    intakeLabel: "Booking coming soon",
    ctaType: "book",
    ctaLabel: "Learn more",
    accent: "blue",
    faqs: [
      {
        question: "Is this a course?",
        answer:
          "No. Career Counselling is a booked conversation. You do not receive a lesson library. Online booking is coming soon.",
      },
      {
        question: "Does the fee include GST?",
        answer: "Yes. The listed price of ₹999 includes GST.",
      },
    ],
    seo: {
      title: "Career Counselling | Addhyan Academy",
      description:
        "Book career counselling with Addhyan Academy (₹999 incl. GST). Clarity on courses and career direction — not a self-paced programme.",
    },
  },
  {
    id: "csr",
    title: "CSR – Community Learning",
    slug: "csr",
    href: "/csr",
    category: "free",
    type: "enquiry",
    price: 0,
    currency: "INR",
    gstIncluded: true,
    positioning: "Skill initiatives for the community",
    shortDescription:
      "Free, community-oriented career and skill initiatives under Addhyan’s CSR effort.",
    description:
      "CSR at Addhyan is for community-oriented career and skill initiatives. It is not a paid product. Details of upcoming community programmes are shared when a specific initiative is open for enrolment.",
    valueProposition:
      "Access community skill initiatives without a paid programme fee.",
    targetAudience: [
      "Learners who need free community programmes",
      "Partners exploring CSR collaboration",
    ],
    level: "All levels",
    duration: "Varies by initiative",
    modules: [],
    outcomes: [
      "Awareness of Addhyan’s community learning efforts",
      "A way to enquire about current or upcoming CSR initiatives",
    ],
    features: [
      "No programme fee",
      "Community-oriented skill and career focus",
    ],
    projects: [],
    practicalActivities: [],
    certificate: {
      included: false,
      summary: "Certificates depend on the specific CSR initiative, if offered.",
    },
    thumbnail: "/courses/csr.svg",
    status: "published",
    intake: "coming-soon",
    intakeLabel: "Applications coming soon",
    ctaType: "explore",
    ctaLabel: "Explore CSR",
    accent: "green",
    faqs: [
      {
        question: "Is CSR a paid course?",
        answer: "No. CSR initiatives are free / community-oriented.",
      },
      {
        question: "How do I join a CSR programme?",
        answer:
          "Applications to join a CSR initiative are coming soon. This page explains the category; we do not list participant numbers we cannot verify.",
      },
    ],
    seo: {
      title: "CSR Community Learning | Addhyan Academy",
      description:
        "Addhyan Academy CSR: free and community-oriented career and skill initiatives. Applications are coming soon.",
    },
  },
  {
    id: "education",
    title: "Education",
    slug: "education",
    href: "/courses/education",
    category: "coming-soon",
    type: "self-paced",
    price: null,
    currency: "INR",
    gstIncluded: true,
    positioning: "Academic programmes — coming soon",
    shortDescription:
      "A future education category from Addhyan Academy. Curriculum will be published when this track opens.",
    description:
      "Education is a planned category for later academic offerings. It is listed so learners can see what is coming; it is not open for enrolment yet.",
    valueProposition:
      "Register interest so we can tell you when Education programmes launch.",
    targetAudience: ["Students looking for future academic tracks"],
    level: "All levels",
    duration: "To be announced",
    modules: [],
    outcomes: [],
    features: [],
    projects: [],
    practicalActivities: [],
    certificate: {
      included: false,
      summary: "Not available until the category launches.",
    },
    thumbnail: "/courses/education.svg",
    status: "coming-soon",
    intake: "coming-soon",
    intakeLabel: "Coming soon",
    ctaType: "coming-soon",
    ctaLabel: "Coming soon",
    accent: "navy",
    faqs: [
      {
        question: "When will Education launch?",
        answer:
          "A date is not published yet. This category is coming soon.",
      },
    ],
    seo: {
      title: "Education (Coming Soon) | Addhyan Academy",
      description:
        "Addhyan Academy’s Education category is coming soon. Register interest for updates.",
    },
  },
  {
    id: "corporate-training",
    title: "Corporate Training",
    slug: "corporate-training",
    href: "/corporate-training",
    category: "service",
    type: "enquiry",
    price: null,
    currency: "INR",
    gstIncluded: true,
    positioning: "Workplace skills for teams",
    shortDescription:
      "Enquiry-based training for organisations that want practical workplace and AI skills for their people.",
    description:
      "Corporate Training is scoped with your organisation — it is not a public self-paced course with a fixed shopping-cart price.",
    valueProposition:
      "Tell us about your team and we will discuss a training fit. No public checkout.",
    targetAudience: [
      "HR and L&D teams",
      "Founders and managers",
      "Organisations onboarding freshers",
    ],
    level: "All levels",
    duration: "Scoped per organisation",
    modules: [],
    outcomes: [
      "A conversation about team skill needs",
      "A proposed training approach if there is a fit",
    ],
    features: [
      "Workplace readiness",
      "Communication and professionalism",
      "AI productivity for office teams (where relevant)",
    ],
    projects: [],
    practicalActivities: [],
    certificate: {
      included: false,
      summary: "Certification, if any, is agreed per engagement.",
    },
    thumbnail: "/courses/corporate.svg",
    status: "published",
    intake: "coming-soon",
    intakeLabel: "Requests coming soon",
    ctaType: "enquire",
    ctaLabel: "Learn more",
    accent: "orange",
    faqs: [
      {
        question: "Is there a public price?",
        answer:
          "No. Corporate Training will be quoted after group size, goals and format are agreed. Requesting a programme online is coming soon.",
      },
    ],
    seo: {
      title: "Corporate Training | Addhyan Academy",
      description:
        "Request workplace and AI skill training for your organisation. Enquiry-based, not a public course checkout.",
    },
  },
  {
    id: "franchise",
    title: "Franchise with Addhyan",
    slug: "franchise",
    href: "/franchise",
    category: "partnership",
    type: "enquiry",
    price: null,
    currency: "INR",
    gstIncluded: true,
    positioning: "Partner with Addhyan Academy",
    shortDescription:
      "A partnership enquiry for people interested in taking Addhyan programmes to their city or network.",
    description:
      "Franchise with Addhyan is a business partnership conversation. It is not a student course and has no self-paced lessons.",
    valueProposition:
      "Explore whether a local Addhyan presence is right for you. Partner enquiries are coming soon.",
    targetAudience: [
      "Education entrepreneurs",
      "Training centre owners",
      "Professionals exploring a skill-education partnership",
    ],
    level: "All levels",
    duration: "Partnership process",
    modules: [],
    outcomes: [
      "An introduction to how Addhyan works with partners",
      "A conversation if the partnership is a potential fit — when enquiries open",
    ],
    features: [
      "Access to Addhyan programme positioning",
      "Operational discussion after qualification",
    ],
    projects: [],
    practicalActivities: [],
    certificate: {
      included: false,
      summary: "Not a student certification product.",
    },
    thumbnail: "/courses/franchise.svg",
    status: "published",
    intake: "coming-soon",
    intakeLabel: "Enquiries coming soon",
    ctaType: "enquire",
    ctaLabel: "Learn more",
    accent: "navy",
    faqs: [
      {
        question: "Is this a course I can buy?",
        answer:
          "No. Franchise is a partnership conversation, separate from student programmes. Partner enquiries are coming soon.",
      },
    ],
    seo: {
      title: "Franchise with Addhyan Academy",
      description:
        "Partner with Addhyan Academy. Franchise is a business conversation, not a student course. Online enquiries are coming soon.",
    },
  },
];

export function getOfferingBySlug(slug: string): Offering | undefined {
  return offerings.find((item) => item.slug === slug);
}

export function getOfferingsByCategory(
  category: Offering["category"]
): Offering[] {
  return offerings.filter((item) => item.category === category);
}

export function paidCourses(): Offering[] {
  return offerings.filter((item) => item.category === "paid");
}

export function catalogueCourses(): Offering[] {
  return offerings.filter((item) =>
    ["paid", "free", "coming-soon", "service"].includes(item.category)
  );
}

export function featuredOfferings(): Offering[] {
  return offerings.filter((item) =>
    ["jrp", "jrp-advance", "basic-ai", "advanced-ai"].includes(item.id)
  );
}

export { lessonCount };
