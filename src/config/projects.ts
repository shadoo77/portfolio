import type { Locale } from "@/i18n/routing";

export type Project = {
  slug: string;
  name: string;
  year: string;
  tags: string[];
  tagline: Record<Locale, string>;
  repo?: string;
  live?: string;
  accent: "lime" | "cyan" | "violet" | "amber";
};

export const projects: Project[] = [
  {
    slug: "cv-maker-2026",
    name: "CV Maker 2026",
    year: "2026",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    tagline: {
      en: "Bilingual CV builder with three live templates, accent theming and print-perfect PDF export.",
      nl: "Tweetalige cv-builder met drie live templates, accentkleuren en perfecte pdf-export.",
      ar: "منشئ سيرة ذاتية ثنائي اللغة بثلاثة قوالب مباشرة وتخصيص للألوان وتصدير PDF جاهز للطباعة.",
    },
    repo: "https://github.com/shadoo77/cv-maker-2026",
    live: "https://shadoo77.github.io/cv-maker-2026/",
    accent: "lime",
  },
  {
    slug: "recipes-app",
    name: "Recipes App",
    year: "2025",
    tags: ["TypeScript", "React", "AI"],
    tagline: {
      en: "Turns pantry ingredients into structured, AI-generated recipes.",
      nl: "Maakt van ingrediënten in je kast gestructureerde, AI-gegenereerde recepten.",
      ar: "يحوّل مكونات المطبخ إلى وصفات منظمة مولّدة بالذكاء الاصطناعي.",
    },
    repo: "https://github.com/shadoo77/recipes-app",
    accent: "amber",
  },
  {
    slug: "nextjs-viator",
    name: "Next.js Viator",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    tagline: {
      en: "Travel booking interface built with Next.js App Router, server components and cached API data.",
      nl: "Reisboekingsinterface met Next.js App Router, server components en gecachte API-data.",
      ar: "واجهة حجز رحلات مبنية بـ Next.js App Router ومكوّنات الخادم وبيانات API مخزّنة.",
    },
    repo: "https://github.com/shadoo77/nextjs-viator",
    accent: "cyan",
  },
  {
    slug: "deep-not-loud",
    name: "DeepNotLoud",
    year: "2026",
    tags: ["Remotion", "React", "TypeScript", "AI"],
    tagline: {
      en: "Remotion-powered documentary video generator driven by AI scripts and automated rendering.",
      nl: "Door Remotion aangedreven documentairegenerator met AI-scripts en geautomatiseerde rendering.",
      ar: "مولّد أفلام وثائقية يعمل بـ Remotion، مدعوم بنصوص الذكاء الاصطناعي والعرض الآلي.",
    },
    repo: "https://github.com/shadoo77/DeepNotLoud",
    accent: "violet",
  },
];
