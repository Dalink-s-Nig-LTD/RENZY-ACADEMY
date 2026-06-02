export const LOGO_URL = "/renzy-logo-mark.jpg";
export const PHONE = "+234 901 069 2401";
export const PHONE_RAW = "+2349010692401";
export const EMAIL = "info@renzyacademy.com";
export const WHATSAPP_LINK = "https://wa.me/2349010692401";

export const BENEFITS: [string, string][] = [
  ["Deliver Projects Faster", "Master Agile methodologies that accelerate delivery cycles."],
  ["Respond to Business Changes", "Develop adaptability to pivot when market conditions shift."],
  ["Improve Team Collaboration", "Lead cross-functional teams with transparency and accountability."],
  ["Increase Customer Satisfaction", "Put customer value at the center of every sprint."],
  ["Lead Agile Transformation", "Champion Agile practices at scale across departments."],
  ["Thrive in Digital Environments", "Excel in modern, remote-first workplaces."],
];

export const INDUSTRIES = [
  "Technology",
  "Banking & Finance",
  "Telecommunications",
  "Healthcare",
  "Oil & Gas",
  "Consulting",
  "Manufacturing",
  "Startups",
];

export const AUDIENCE = [
  "Project Managers",
  "Business Analysts",
  "Product Managers",
  "Scrum Masters",
  "Team Leads",
  "Software Professionals",
  "Operations",
  "Career Transitioners",
];

export interface Testimonial {
  text: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { text: "I do not know what I was reading before I came to Renzy Academy. The Agile concept makes a lot of sense to me now.", name: "Raul", role: "PMP Exam Prep" },
  { text: "Thank you for your patience in helping me break down concepts until I actually understood them. I am truly grateful.", name: "Aunty Esther", role: "Agile Graduate" },
  { text: "My lecture is going very well with Mr Tayo. Thank you to the entire Renzy Academy team for the support.", name: "Cohort Member", role: "PMI-ACP Trainee" },
];

export interface FAQEntry {
  id: number;
  question: string;
  keywords: string[];
  answer: string;
}

export const FAQ_DATABASE: FAQEntry[] = [
  {
    id: 1,
    question: "What is PMI-ACP certification?",
    keywords: ["pmi-acp", "certification", "what is"],
    answer: "PMI-ACP (Agile Certified Practitioner) is a certification offered by the Project Management Institute that validates your ability to work in Agile environments. It covers Scrum, Kanban, Lean, XP, Hybrid Agile, and Iterative Development.",
  },
  {
    id: 2,
    question: "What are the prerequisites for the PMI-ACP exam?",
    keywords: ["prerequisite", "requirement", "eligibility", "exam"],
    answer: "To be eligible for the PMI-ACP exam, you need: 2,000 hours of general project experience (last 5 years), 1,500 hours on Agile project teams (last 3 years), and 21 contact hours of Agile training.",
  },
  {
    id: 3,
    question: "How long is the training course?",
    keywords: ["duration", "course length", "how long", "training"],
    answer: "Our PMI-ACP training course is typically 40 hours of instruction, spread over 4-6 weeks depending on the cohort. This includes live sessions, practice exams, and Q&A sessions.",
  },
  {
    id: 4,
    question: "What frameworks does the course cover?",
    keywords: ["framework", "scrum", "kanban", "lean", "xp"],
    answer: "The course covers 6 Agile frameworks: Scrum, Kanban, Lean, Extreme Programming (XP), Hybrid Agile, and Iterative and Incremental Development.",
  },
  {
    id: 5,
    question: "Is there a money-back guarantee?",
    keywords: ["refund", "guarantee", "money back"],
    answer: "Yes, we offer a 14-day money-back guarantee if you are not satisfied with the course quality. Contact our support team for details.",
  },
  {
    id: 6,
    question: "When is the next cohort starting?",
    keywords: ["cohort", "start date", "when", "next batch"],
    answer: "Cohorts start monthly. For the exact dates of upcoming cohorts, please contact us via WhatsApp, email, or fill the enrollment form with your preferred timeline.",
  },
  {
    id: 7,
    question: "How much does the training cost?",
    keywords: ["price", "cost", "fee", "pricing"],
    answer: "Pricing varies based on the package and delivery format. For detailed pricing information, please reach out to our team at info@renzyacademy.com or WhatsApp: +2349010692401",
  },
  {
    id: 8,
    question: "Can I get a refund if I cannot complete the course?",
    keywords: ["refund", "withdrawal", "cancel"],
    answer: "Refund policies depend on when you withdraw from the course. We offer pro-rated refunds for early withdrawals. Contact our team for specific details.",
  },
  {
    id: 9,
    question: "Do you provide study materials?",
    keywords: ["materials", "resources", "study", "books"],
    answer: "Yes! All participants receive comprehensive study materials including: Digital course notes, Practice exams, Video recordings of all sessions, and Reference guides.",
  },
  {
    id: 10,
    question: "Is the certification globally recognized?",
    keywords: ["global", "recognition", "international", "valid"],
    answer: "Yes, PMI-ACP is globally recognized and valued by employers worldwide. It is respected across technology, finance, healthcare, and other industries.",
  },
];

export function findRelevantFAQ(query: string): FAQEntry | null {
  const lowerQuery = query.toLowerCase();
  for (const faq of FAQ_DATABASE) {
    for (const keyword of faq.keywords) {
      if (lowerQuery.includes(keyword)) return faq;
    }
  }
  for (const faq of FAQ_DATABASE) {
    const questionLower = faq.question.toLowerCase();
    if (lowerQuery.split(" ").some((word) => questionLower.includes(word))) return faq;
  }
  return null;
}
