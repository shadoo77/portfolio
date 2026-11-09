import type { Locale } from "@/i18n/routing";

type Localized<T> = Record<Locale, T>;

export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  period: Localized<string>;
  group?: Localized<string>;
  bullets: Localized<string[]>;
};

export const experience: ExperienceEntry[] = [
  {
    company: "This is Development B.V.",
    role: "Frontend Developer",
    location: "Utrecht, NL",
    period: {
      en: "Oct 2022 — Present",
      nl: "okt 2022 — heden",
      ar: "أكتوبر ٢٠٢٢ — الآن",
    },
    bullets: {
      en: [
        "Own frontend architecture for client platforms in Next.js, Vite and Tailwind, and set the component and code-review standards the team follows.",
        "Deliver full-stack features by integrating Laravel and Inertia.js into a single React codebase.",
        "Led technical SEO and performance audits that improved organic visibility and conversion.",
        "Introduced AI-assisted workflows (Claude Code, LLMs) that cut feature delivery time by roughly 40%.",
      ],
      nl: [
        "Verantwoordelijk voor de frontend-architectuur van klantplatformen in Next.js, Vite en Tailwind; stelt de component- en code review-standaarden voor het team vast.",
        "Levert full-stack features door Laravel en Inertia.js te integreren in één React-codebase.",
        "Leidde technische SEO- en performance-audits die de organische zichtbaarheid en conversie verbeterden.",
        "Introduceerde AI-ondersteunde workflows (Claude Code, LLM's) die de featurelevertijd met circa 40% verkortten.",
      ],
      ar: [
        "أدير هندسة الواجهة الأمامية لمنصات العملاء باستخدام Next.js وVite وTailwind، وأضع معايير المكوّنات ومراجعة الكود التي يتبعها الفريق.",
        "أسلم مزايا متكاملة عبر دمج Laravel وInertia.js في قاعدة كود React واحدة.",
        "قدت تدقيقات تقنية لتحسين محركات البحث والأداء أفضت إلى تحسين الظهور العضوي والتحويل.",
        "أدخلت سير عمل مدعومًا بالذكاء الاصطناعي (Claude Code ونماذج اللغة) قلّل وقت تسليم المزايا بنحو 40%.",
      ],
    },
  },
  {
    company: "Gofilex Film B.V.",
    role: "Frontend Developer",
    location: "Zeist, NL",
    period: {
      en: "Mar 2022 — Sep 2022",
      nl: "mrt 2022 — sep 2022",
      ar: "مارس ٢٠٢٢ — سبتمبر ٢٠٢٢",
    },
    group: {
      en: "Fixed-term roles · 2021–2022",
      nl: "Tijdelijke contracten · 2021–2022",
      ar: "أدوار محددة المدة · ٢٠٢١–٢٠٢٢",
    },
    bullets: {
      en: [
        "Rebuilt legacy React components and modular Sass into a faster, more maintainable media delivery platform.",
      ],
      nl: [
        "Herschreef legacy React-componenten en modulaire Sass tot een sneller en beter onderhoudbaar mediaplatform.",
      ],
      ar: [
        "أعدت بناء مكوّنات React القديمة وSass المعيارية إلى منصة توصيل وسائط أسرع وأسهل صيانة.",
      ],
    },
  },
  {
    company: "4net Interactive (Conclusion)",
    role: "Frontend Developer",
    location: "Driebergen-Rijsenburg, NL",
    period: {
      en: "Nov 2021 — Mar 2022",
      nl: "nov 2021 — mrt 2022",
      ar: "نوفمبر ٢٠٢١ — مارس ٢٠٢٢",
    },
    group: {
      en: "Fixed-term roles · 2021–2022",
      nl: "Tijdelijke contracten · 2021–2022",
      ar: "أدوار محددة المدة · ٢٠٢١–٢٠٢٢",
    },
    bullets: {
      en: [
        "Built complex React interfaces and a reusable Material-UI component library to WCAG accessibility standards.",
      ],
      nl: [
        "Bouwde complexe React-interfaces en een herbruikbare Material-UI componentbibliotheek volgens WCAG-toegankelijkheidsrichtlijnen.",
      ],
      ar: [
        "بنيت واجهات React معقّدة ومكتبة مكوّنات Material-UI قابلة لإعادة الاستخدام وفق معايير وصول WCAG.",
      ],
    },
  },
  {
    company: "We Are Eves",
    role: "Fullstack Developer",
    location: "Amsterdam, NL",
    period: {
      en: "Apr 2020 — Nov 2021",
      nl: "apr 2020 — nov 2021",
      ar: "أبريل ٢٠٢٠ — نوفمبر ٢٠٢١",
    },
    bullets: {
      en: [
        "Scaled a social-commerce platform with React/Next.js and built Node.js/TypeScript REST APIs and microservices.",
      ],
      nl: [
        "Schaalde een social-commerceplatform met React/Next.js en bouwde Node.js/TypeScript REST-API's en microservices.",
      ],
      ar: [
        "وسّعت منصة تجارة اجتماعية باستخدام React/Next.js وبنيت واجهات REST وخدمات مصغّرة بـ Node.js/TypeScript.",
      ],
    },
  },
];
