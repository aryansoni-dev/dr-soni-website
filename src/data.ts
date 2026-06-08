export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Will map to Lucide icons
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  content: string;
  relationship: string;
}

export interface Partner {
  id: string;
  name: string;
  type: string;
  logoText: string;
  description: string;
  highlights: string[];
}

export const ADVISOR_INFO = {
  name: "Dr. J Soni",
  title: "Life Advisor & Insurance Consultant",
  tagline: "Securing Lives, Building Futures",
  subTagline: "Channel Partner — Kotak Life Insurance & Care Health Insurance",
  phone: "+91 9098820694",
  phoneRaw: "9098820694",
  whatsapp: "9098820694",
  email: "drjsoni1978@gmail.com",
  location: "Gurugram, Haryana",
  officeHours: "Mon–Sat 10:00 AM – 7:00 PM",
  experienceYears: 15,
};

export const SERVICES: Service[] = [
  {
    id: "life-insurance",
    title: "Life Insurance",
    description: "Secure your family's financial future with customizable term, whole-life, and endowment plans designed to protect your loved ones in any eventuality.",
    iconName: "ShieldCheck",
  },
  {
    id: "health-insurance",
    title: "Health Insurance",
    description: "Compelling healthcare protection covering intensive medical costs, critical illnesses, and cashless hospitalization for you and your family.",
    iconName: "HeartPulse",
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning",
    description: "Ensure a steady, independent stream of income for your golden years with robust, structured annuity models and retirement savings plans.",
    iconName: "TrendingUp",
  },
  {
    id: "family-protection",
    title: "Family Protection",
    description: "Create a fortress of financial security around your dependents, insulating them from liabilities with calculated umbrella coverage.",
    iconName: "Users",
  },
  {
    id: "wealth-management",
    title: "Wealth Management",
    description: "Tailored wealth-building products matching your risk appetite, allowing you to beat inflation and achieve systematic financial growth.",
    iconName: "Briefcase",
  },
  {
    id: "child-future",
    title: "Child Future Planning",
    description: "Guarantee that your child's educational milestones and vital aspirations are fully funded, robustly insulated from life's contingencies.",
    iconName: "GraduationCap",
  },
];

export const PARTNERS: Partner[] = [
  {
    id: "kotak",
    name: "Kotak Life Insurance",
    type: "Channel Partner",
    logoText: "kotak",
    description: "One of India's most trusted insurance providers, delivering custom protection solutions, excellent claim settlement ratios, and consistent long-term wealth value.",
    highlights: ["High Claim Settlement Ratio", "Customizable Life Coverages", "Wide Network of Help Centers"],
  },
  {
    id: "care",
    name: "Care Health Insurance",
    type: "Channel Partner",
    logoText: "care",
    description: "A leading specialist health insurer offering comprehensive coverage, state-of-the-art diagnostic care coverage, and absolute cashless hospital network integration.",
    highlights: ["Over 22,000+ Cashless Providers", "No Claim Bonus Protection", "Instant Digital Claim Assistance"],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "review-1",
    name: "Ramesh Agarwal",
    city: "Delhi",
    rating: 5,
    content: "Dr. Soni helped me choose the right Kotak Life plan for my family. His advice was clear, honest, and perfectly suited to my needs.",
    relationship: "Kotak Life Client",
  },
  {
    id: "review-2",
    name: "Sunita Mehta",
    city: "Jaipur",
    rating: 5,
    content: "I never understood health insurance until I met Dr. Soni. Care Health Insurance through him has been a blessing for our family.",
    relationship: "Care Health Client",
  },
  {
    id: "review-3",
    name: "Vikram Sharma",
    city: "Lucknow",
    rating: 5,
    content: "Got my entire family covered for health and life — all in one meeting. Dr. Soni's professionalism is unmatched.",
    relationship: "Comprehensive Cover",
  },
  {
    id: "review-4",
    name: "Priya Verma",
    city: "Noida",
    rating: 5,
    content: "I was confused by all the insurance options. Dr. Soni patiently explained everything and found the best plan within my budget.",
    relationship: "Family Protection",
  },
  {
    id: "review-5",
    name: "Anil Kapoor",
    city: "Agra",
    rating: 5,
    content: "Planning retirement felt overwhelming, but Dr. Soni made it simple and reassuring. Truly a trusted life advisor.",
    relationship: "Retirement Planning",
  },
];
