export const site = {
  name: "Addhyan Academy",
  legalName: "Yati Resource Private Limited",
  tagline: "Learn • Grow • Succeed",
  description:
    "Practical, affordable career education for students, graduates, job seekers and working professionals — workplace skills, AI tools, and career guidance.",
  affiliation: "A part of Yati Group",
  url: "https://addhyan.academy",
  logo: "/brand/addhyan-academy-logo.png",
  contact: {
    email: "hello@addhyan.academy",
    phone: "+91 00000 00000",
    address: "Address to be confirmed",
    note: "Phone, email and address are placeholders until official contact details are published.",
  },
} as const;

export const nav = {
  primary: [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses", hasMenu: true },
    { href: "/find-my-course", label: "Find My Course" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ] as const satisfies readonly {
    href: string;
    label: string;
    hasMenu?: boolean;
  }[],
  coursesMenu: [
    {
      heading: "Paid courses",
      links: [
        { href: "/courses/jrp", label: "JRP – Job Ready Program" },
        { href: "/courses/jrp-advance", label: "JRP Advance" },
        { href: "/courses/basic-ai", label: "Basic AI" },
        { href: "/courses/advanced-ai", label: "Advanced AI" },
      ],
    },
    {
      heading: "Free learning",
      links: [
        { href: "/csr", label: "CSR" },
        { href: "/courses/education", label: "Education (Coming soon)" },
      ],
    },
    {
      heading: "Career & services",
      links: [
        { href: "/career-counselling", label: "Career Counselling" },
        { href: "/corporate-training", label: "Corporate Training" },
      ],
    },
  ],
  footer: {
    programmes: [
      { href: "/courses/jrp", label: "JRP" },
      { href: "/courses/jrp-advance", label: "JRP Advance" },
      { href: "/courses/basic-ai", label: "Basic AI" },
      { href: "/courses/advanced-ai", label: "Advanced AI" },
      { href: "/csr", label: "CSR" },
    ],
    services: [
      { href: "/career-counselling", label: "Career Counselling" },
      { href: "/corporate-training", label: "Corporate Training" },
      { href: "/franchise", label: "Franchise" },
      { href: "/find-my-course", label: "Find My Course" },
    ],
    academy: [
      { href: "/login", label: "Sign in" },
      { href: "/register", label: "Register" },
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
} as const;
