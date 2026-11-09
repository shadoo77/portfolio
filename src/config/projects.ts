import type { Locale } from "@/i18n/routing";

type Localized<T> = Record<Locale, T>;

export type ProjectHighlight = {
  title: Localized<string>;
  body: Localized<string>;
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  tags: string[];
  tagline: Localized<string>;
  repo?: string;
  live?: string;
  accent: "lime" | "cyan" | "violet" | "amber";
  caseStudy: {
    overview: Localized<string>;
    highlights: ProjectHighlight[];
  };
};

export const projects: Project[] = [
  {
    slug: "cv-maker-2026",
    name: "CV Maker 2026",
    year: "2026",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    tagline: {
      en: "Bilingual CV builder with four live templates, accent theming and print-perfect PDF export.",
      nl: "Tweetalige cv-builder met vier live templates, accentkleuren en perfecte pdf-export.",
      ar: "منشئ سيرة ذاتية ثنائي اللغة بأربعة قوالب مباشرة وتخصيص للألوان وتصدير PDF جاهز للطباعة.",
    },
    repo: "https://github.com/shadoo77/cv-maker-2026",
    live: "https://shadoo77.github.io/cv-maker-2026/",
    accent: "lime",
    caseStudy: {
      overview: {
        en: "A bilingual CV builder that renders one typed CV model through four print-ready templates. The same data model produced the CV behind this portfolio.",
        nl: "Een tweetalige cv-builder die één getypt cv-model door vier printklare templates rendert. Hetzelfde datamodel vormde de basis voor het cv achter deze portfolio.",
        ar: "منشئ سيرة ذاتية ثنائي اللغة يعرض نموذج بيانات واحدًا عبر أربعة قوالب جاهزة للطباعة. النموذج نفسه أنتج السيرة الذاتية وراء هذا الموقع.",
      },
      highlights: [
        {
          title: {
            en: "Four templates",
            nl: "Vier templates",
            ar: "أربعة قوالب",
          },
          body: {
            en: "Neo Minimal, Dark Tech, Creative Glass and an ATS-friendly layout, all driven by the same typed data.",
            nl: "Neo Minimal, Dark Tech, Creative Glass en een ATS-vriendelijke lay-out, allemaal op dezelfde getypte data.",
            ar: "قوالب Neo Minimal وDark Tech وCreative Glass وتصميم متوافق مع أنظمة ATS، جميعها من البيانات نفسها.",
          },
        },
        {
          title: {
            en: "Accent theming",
            nl: "Accentkleuren",
            ar: "تخصيص الألوان",
          },
          body: {
            en: "A colour map drives the palette per template, with a control panel that updates the preview instantly.",
            nl: "Een kleurenkaart bepaalt het palet per template, met een bedieningspaneel dat de preview direct bijwerkt.",
            ar: "خريطة ألوان تحدد لوحة كل قالب، مع لوحة تحكم تحدّث المعاينة فورًا.",
          },
        },
        {
          title: {
            en: "Print-ready export",
            nl: "Printklare export",
            ar: "تصدير جاهز للطباعة",
          },
          body: {
            en: "A dedicated print hook prepares the document so the browser's PDF output matches the live preview.",
            nl: "Een aparte print-hook bereidt het document voor zodat de pdf-uitvoer van de browser overeenkomt met de live preview.",
            ar: "خطاف طباعة مخصص يهيّئ المستند ليطابق ناتج PDF من المتصفح المعاينة المباشرة.",
          },
        },
      ],
    },
  },
  {
    slug: "recipes-app",
    name: "Recipes App",
    year: "2025",
    tags: ["TypeScript", "React", "TanStack Router", "Netlify", "AI"],
    tagline: {
      en: "Turns pantry ingredients into structured, AI-generated recipes.",
      nl: "Maakt van ingrediënten in je kast gestructureerde, AI-gegenereerde recepten.",
      ar: "يحوّل مكونات المطبخ إلى وصفات منظمة مولّدة بالذكاء الاصطناعي.",
    },
    repo: "https://github.com/shadoo77/recipes-app",
    accent: "amber",
    caseStudy: {
      overview: {
        en: "A React app that turns pantry ingredients into structured, AI-generated recipes, with a small serverless backend keeping requests off the client.",
        nl: "Een React-app die ingrediënten uit je kast omzet in gestructureerde, AI-gegenereerde recepten, met een kleine serverless backend die verzoeken buiten de client houdt.",
        ar: "تطبيق React يحوّل مكوّنات المطبخ إلى وصفات منظمة مولّدة بالذكاء الاصطناعي، مع خادم بسيط بلا خوادم يبقي الطلبات خارج المتصفح.",
      },
      highlights: [
        {
          title: {
            en: "Typed routing",
            nl: "Typeveilige routing",
            ar: "توجيه آمن النوع",
          },
          body: {
            en: "TanStack Router with a generated, type-safe route tree and lazy-loaded routes.",
            nl: "TanStack Router met een gegenereerde, typeveilige routestructuur en lazy-loaded routes.",
            ar: "TanStack Router بشجرة مسارات مولّدة وآمنة النوع ومسارات تُحمّل عند الحاجة.",
          },
        },
        {
          title: {
            en: "Serverless functions",
            nl: "Serverless functies",
            ar: "دوال بلا خوادم",
          },
          body: {
            en: "Netlify Functions and shared middleware handle the AI requests without exposing keys in the bundle.",
            nl: "Netlify Functions en gedeelde middleware verwerken de AI-verzoeken zonder sleutels in de bundle.",
            ar: "دوال Netlify ووسيط مشترك يعالجان طلبات الذكاء الاصطناعي دون كشف المفاتيح في الحزمة.",
          },
        },
        {
          title: {
            en: "UI foundation",
            nl: "UI-basis",
            ar: "أساس الواجهة",
          },
          body: {
            en: "shadcn/ui primitives and Tailwind tokens for a consistent, accessible interface.",
            nl: "shadcn/ui-primitives en Tailwind-tokens voor een consistente, toegankelijke interface.",
            ar: "عناصر shadcn/ui ورموز Tailwind لواجهة متسقة وسهلة الوصول.",
          },
        },
      ],
    },
  },
  {
    slug: "nextjs-viator",
    name: "Next.js Viator",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Axios"],
    tagline: {
      en: "Travel booking interface built with Next.js App Router, server components and cached API data.",
      nl: "Reisboekingsinterface met Next.js App Router, server components en gecachte API-data.",
      ar: "واجهة حجز رحلات مبنية بـ Next.js App Router ومكوّنات الخادم وبيانات API مخزّنة.",
    },
    repo: "https://github.com/shadoo77/nextjs-viator",
    accent: "cyan",
    caseStudy: {
      overview: {
        en: "A travel booking interface modelled on Viator: localized browsing, search results, tour detail pages and filters, backed by a proxied CMS API.",
        nl: "Een reisboekingsinterface gemodelleerd naar Viator: gelokaliseerd browsen, zoekresultaten, tourdetailpagina's en filters, ondersteund door een geproxiede CMS-API.",
        ar: "واجهة حجز رحلات مستوحاة من Viator: تصفح متعدد اللغات ونتائج بحث وصفحات تفاصيل الجولات وفلاتر، مدعومة بواجهة API وسيطة لإدارة المحتوى.",
      },
      highlights: [
        {
          title: {
            en: "Localized routing",
            nl: "Gelokaliseerde routing",
            ar: "توجيه متعدد اللغات",
          },
          body: {
            en: "Next.js App Router with `[locale]` segments, EN/NL copy and a language switcher.",
            nl: "Next.js App Router met `[locale]`-segmenten, EN/NL-copy en een taalwisselaar.",
            ar: "Next.js App Router بمقاطع `[locale]` ونصوص إنجليزية وهولندية ومبدّل لغة.",
          },
        },
        {
          title: {
            en: "Search and filters",
            nl: "Zoeken en filteren",
            ar: "البحث والفلاتر",
          },
          body: {
            en: "Price, duration, rating and tag filters with pagination over proxied API data.",
            nl: "Filters op prijs, duur, beoordeling en tags met paginering over geproxiede API-data.",
            ar: "فلاتر للسعر والمدة والتقييم والوسوم مع ترقيم صفحات على بيانات API الوسيطة.",
          },
        },
        {
          title: {
            en: "Booking essentials",
            nl: "Boekingsonderdelen",
            ar: "أساسيات الحجز",
          },
          body: {
            en: "Date picker, tour carousels, testimonials and a mail route for enquiries.",
            nl: "Datumkiezer, tours-carrousels, testimonials en een mailroute voor aanvragen.",
            ar: "منتقي تواريخ وعروض جولات وآراء عملاء ومسار بريد للاستفسارات.",
          },
        },
      ],
    },
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
    caseStudy: {
      overview: {
        en: "A Remotion 4 project that turns scripted documentary episodes into rendered video through reusable scenes, transitions and caption components. Built for the DeepNotLoud YouTube channel, including a short-form series.",
        nl: "Een Remotion 4-project dat gescripte documentaire-afleveringen omzet in gerenderde video via herbruikbare scènes, overgangen en ondertitelcomponenten. Gebouwd voor het DeepNotLoud-YouTube-kanaal, inclusief een shortserie.",
        ar: "مشروع Remotion 4 يحوّل حلقات وثائقية مكتوبة إلى فيديو معروض عبر مشاهد وانتقالات ومكوّنات ترجمة قابلة لإعادة الاستخدام. بُني لقناة DeepNotLoud على يوتيوب، بما في ذلك سلسلة مقاطع قصيرة.",
      },
      highlights: [
        {
          title: {
            en: "Scene system",
            nl: "Scènesysteem",
            ar: "نظام المشاهد",
          },
          body: {
            en: "Each episode is split into acts and scenes with their own constants and metadata, keeping timing and layout composable.",
            nl: "Elke aflevering is opgedeeld in acts en scènes met eigen constanten en metadata, zodat timing en lay-out samenstelbaar blijven.",
            ar: "كل حلقة مقسّمة إلى فصول ومشاهد لها ثوابت وبيانات وصفية خاصة، ما يبقي التوقيت والتخطيط قابلين للتركيب.",
          },
        },
        {
          title: {
            en: "Caption toolkit",
            nl: "Ondertiteltoolkit",
            ar: "مجموعة أدوات الترجمة",
          },
          body: {
            en: "YouTube, TikTok, eulogy and line captions generated from transcript JSON, with scripts for caption and transcript post-processing.",
            nl: "YouTube-, TikTok-, eulogy- en regelondertitels gegenereerd uit transcript-JSON, met scripts voor nabewerking van ondertitels en transcripten.",
            ar: "ترجمات يوتيوب وتيك توك وتأبين ونص سطري مولّدة من JSON للنصوص، مع سكربتات لمعالجة الترجمات والنصوص.",
          },
        },
        {
          title: {
            en: "Motion atoms",
            nl: "Motion-atomen",
            ar: "عناصر الحركة",
          },
          body: {
            en: "Reusable transitions, dust particles, count-ups, rolling digits and ticker bars keep the visual language consistent across episodes.",
            nl: "Herbruikbare overgangen, stofdeeltjes, count-ups, rollende cijfers en tickerbalken houden de visuele taal consistent per aflevering.",
            ar: "انتقالات وجزيئات غبار وعدّادات وأرقام متدحرجة وأشرطة أخبار قابلة لإعادة الاستخدام تحافظ على اتساق اللغة البصرية بين الحلقات.",
          },
        },
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
