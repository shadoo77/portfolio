import { z } from "zod";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

const localized = <T extends z.ZodType>(schema: T) =>
  z.object({
    en: schema,
    nl: schema,
    ar: schema,
  });

const stepSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

const decisionSchema = z.object({
  decision: z.string().min(1),
  alternative: z.string().min(1),
  reason: z.string().min(1),
});

const highlightSchema = z.object({
  title: localized(z.string().min(1)),
  body: localized(z.string().min(1)),
});

const caseStudySchema = z.object({
  overview: localized(z.string().min(1)),
  tldr: localized(z.array(z.string().min(1)).min(2).max(4)).optional(),
  problem: localized(z.string().min(1)).optional(),
  constraints: localized(z.array(z.string().min(1)).min(1)).optional(),
  approach: localized(z.array(stepSchema).min(1)).optional(),
  decisions: localized(z.array(decisionSchema).min(1)).optional(),
  outcome: localized(z.array(z.string().min(1)).min(1)).optional(),
  lessons: localized(z.array(z.string().min(1)).min(1)).optional(),
  highlights: z.array(highlightSchema),
});

export const projectSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  year: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  tagline: localized(z.string().min(1)),
  repo: z.url().optional(),
  live: z.url().optional(),
  accent: z.enum(["lime", "cyan", "violet", "amber"]),
  caseStudy: caseStudySchema,
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectHighlight = z.infer<typeof highlightSchema>;
export type ProjectDecision = z.infer<typeof decisionSchema>;
export type ProjectStep = z.infer<typeof stepSchema>;
export type Localized<T> = Record<Locale, T>;

export const projects: Project[] = z.array(projectSchema).parse([
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
  {
    slug: "portfolio",
    name: "Portfolio 2026",
    year: "2026",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Playwright"],
    tagline: {
      en: "The site you are reading: Next.js 16 with partial prerendering, genuine RTL Arabic and a test suite that gates every merge.",
      nl: "De site die je nu leest: Next.js 16 met partial prerendering, echt RTL-Arabisch en een testsuite die elke merge tegenhoudt.",
      ar: "الموقع الذي تقرأه الآن: Next.js 16 مع العرض الجزئي المسبق، ودعم عربي كامل من اليمين إلى اليسار، ومجموعة اختبارات تحمي كل دمج.",
    },
    repo: "https://github.com/shadoo77/portfolio",
    live: siteConfig.url,
    accent: "cyan",
    caseStudy: {
      overview: {
        en: "A trilingual portfolio built as a production Next.js 16 application rather than a static résumé: App Router with partial prerendering, EN/NL/AR with genuine RTL, typed content, a server-action contact form and an end-to-end suite that runs on every pull request.",
        nl: "Een drietalige portfolio, gebouwd als productieklare Next.js 16-applicatie in plaats van een statisch cv: App Router met partial prerendering, EN/NL/AR met echte RTL, getypeerde content, een contactformulier via een server action en een end-to-end testsuite die bij elke pull request draait.",
        ar: "موقع شخصي بثلاث لغات، بُني كتطبيق Next.js 16 جاهز للإنتاج لا كسيرة ذاتية ثابتة: App Router مع العرض الجزئي المسبق، وثلاث لغات بينها العربية بدعم كامل من اليمين إلى اليسار، ومحتوى آمن النوع، ونموذج تواصل عبر Server Action، ومجموعة اختبارات تعمل مع كل طلب دمج.",
      },
      tldr: {
        en: [
          "Three locales with real RTL: logical properties, mirrored navigation, and the Arabic font loaded only on /ar.",
          "A contact form that sends through Resend when configured and falls back to a prefilled mailto handoff when it is not.",
          "18 Playwright tests, with Lighthouse 95–99 performance and 100 for accessibility, best practices and SEO.",
        ],
        nl: [
          "Drie talen met echte RTL: logische properties, gespiegelde navigatie en het Arabische font alleen op /ar.",
          "Een contactformulier dat via Resend verstuurt wanneer dat is ingesteld en anders terugvalt op een voorgevulde mailto-overdracht.",
          "18 Playwright-tests, met Lighthouse 95–99 performance en 100 voor toegankelijkheid, best practices en SEO.",
        ],
        ar: [
          "ثلاث لغات بدعم حقيقي للاتجاه من اليمين إلى اليسار: خصائص منطقية وتنقّل معكوس وخط عربي يُحمّل على /ar فقط.",
          "نموذج تواصل يرسل عبر Resend عند إعداده، ويعود إلى تحويل mailto مُهيّأ مسبقًا عند غيابه.",
          "١٨ اختبار Playwright، ونتائج Lighthouse بين ٩٥ و٩٩ في الأداء و١٠٠ في سهولة الوصول وأفضل الممارسات وSEO.",
        ],
      },
      problem: {
        en: "A CV can list seven years of React, but it cannot show how the work gets done. I wanted a site that demonstrates the claims — Next.js depth, accessibility, performance, i18n — while staying honest about which work is public.",
        nl: "Een cv kan zeven jaar React opsommen, maar laat niet zien hoe er gewerkt wordt. Ik wilde een site die de claims bewijst — Next.js-diepgang, toegankelijkheid, performance, i18n — en tegelijk eerlijk blijft over welk werk openbaar is.",
        ar: "السيرة الذاتية تستطيع سرد سبع سنوات من React، لكنها لا تُظهر طريقة العمل. أردت موقعًا يُثبت هذه الادعاءات — عمق Next.js وسهولة الوصول والأداء وتعدد اللغات — مع البقاء صريحًا حول ما هو عمل عام.",
      },
      constraints: {
        en: [
          "Company and client work is under NDA, so only side projects appear in the work section.",
          "Three languages from day one, with Arabic treated as a real RTL locale rather than a mirrored afterthought.",
          "Free Vercel hosting: every performance decision had to be cheap to run.",
        ],
        nl: [
          "Werk voor werkgevers en klanten valt onder een NDA, dus alleen hobbyprojecten staan in de werk-sectie.",
          "Drie talen vanaf dag één, waarbij Arabisch een echte RTL-taal is en geen gespiegelde bijzaak.",
          "Gratis hosting op Vercel: elke performancekeuze moest goedkoop te draaien zijn.",
        ],
        ar: [
          "أعمال الشركات والعملاء تحت اتفاقية سرية، لذلك تظهر المشاريع الجانبية فقط في قسم الأعمال.",
          "ثلاث لغات من اليوم الأول، مع معالجة العربية كلغة حقيقية من اليمين إلى اليسار لا كإضافة معكوسة.",
          "استضافة مجانية على Vercel: كل قرار أداء يجب أن يكون رخيص التشغيل.",
        ],
      },
      approach: {
        en: [
          {
            title: "Content as typed data",
            body: "Projects, experience and UI copy live in typed config and message files, so a missing translation or field fails the build instead of shipping.",
          },
          {
            title: "Locale as a route segment",
            body: "Every route sits under /[locale], next-intl supplies the messages, and the proxy negotiates the locale before the page renders.",
          },
          {
            title: "RTL by construction",
            body: "Logical properties (ps/pe/ms/me) instead of left and right, mirrored directional icons, and a mobile sheet that opens from the left in Arabic.",
          },
          {
            title: "Metadata per route",
            body: "Canonical URLs, hreflang alternates, Open Graph images and Person JSON-LD are generated per locale and per route instead of being set once.",
          },
        ],
        nl: [
          {
            title: "Content als getypeerde data",
            body: "Projecten, ervaring en UI-copy staan in getypeerde config- en message-bestanden, zodat een ontbrekende vertaling of veld de build laat falen in plaats van live te gaan.",
          },
          {
            title: "Locale als route-segment",
            body: "Elke route staat onder /[locale], next-intl levert de teksten en de proxy onderhandelt de taal voordat de pagina rendert.",
          },
          {
            title: "RTL vanaf de basis",
            body: "Logische properties (ps/pe/ms/me) in plaats van links en rechts, gespiegelde richtingsiconen en een mobiel paneel dat in het Arabisch van links openklapt.",
          },
          {
            title: "Metadata per route",
            body: "Canonical-URL's, hreflang-alternatieven, Open Graph-afbeeldingen en Person-JSON-LD worden per taal en per route gegenereerd in plaats van één keer ingesteld.",
          },
        ],
        ar: [
          {
            title: "المحتوى كبيانات آمنة النوع",
            body: "المشاريع والخبرة ونصوص الواجهة في ملفات إعدادات ورسائل آمنة النوع، فأي ترجمة أو حقل ناقص يُفشل البناء بدل أن يُنشر.",
          },
          {
            title: "اللغة كمقطع في المسار",
            body: "كل مسار تحت /[locale]، وnext-intl يوفّر النصوص، والوسيط يحدّد اللغة قبل عرض الصفحة.",
          },
          {
            title: "الاتجاه من الأساس",
            body: "خصائص منطقية (ps/pe/ms/me) بدل اليسار واليمين، وأيقونات اتجاه معكوسة، وقائمة جانبية تُفتح من اليسار في العربية.",
          },
          {
            title: "بيانات وصفية لكل مسار",
            body: "روابط canonical وبدائل hreflang وصور Open Graph وبيانات Person تُولّد لكل لغة ولكل مسار بدل ضبطها مرة واحدة.",
          },
        ],
      },
      decisions: {
        en: [
          {
            decision: "React 19 useActionState instead of react-hook-form",
            alternative: "react-hook-form with a Zod resolver",
            reason:
              "One shared Zod schema already validates on the client and the server; the form library would add two dependencies for behaviour the platform now provides.",
          },
          {
            decision: "Mailto handoff when no mail provider is configured",
            alternative: "Disable the form until Resend is set up",
            reason:
              "The form works from the first deploy, and the handoff panel keeps a real mailto link as a fallback for browsers that block protocol launches.",
          },
          {
            decision: "Vercel's production domain outranks SITE_URL",
            alternative: "Trust the environment variable alone",
            reason:
              "Renaming the project once left every canonical pointing at a domain that answered 404. The platform knows the live domain, so it wins.",
          },
          {
            decision: "Load the Arabic font on demand",
            alternative: "Preload every font on every page",
            reason:
              "Four Arabic weights were being preloaded on EN and NL pages that never render them, costing roughly 134 KB per visit.",
          },
        ],
        nl: [
          {
            decision: "React 19 useActionState in plaats van react-hook-form",
            alternative: "react-hook-form met een Zod-resolver",
            reason:
              "Eén gedeeld Zod-schema valideert al op de client en de server; de formulierbibliotheek zou twee dependencies toevoegen voor gedrag dat het platform nu zelf biedt.",
          },
          {
            decision: "Mailto-overdracht zonder mailprovider",
            alternative: "Het formulier uitschakelen tot Resend is ingesteld",
            reason:
              "Het formulier werkt vanaf de eerste deploy, en het paneel houdt een echte mailto-link als fallback voor browsers die protocolaanroepen blokkeren.",
          },
          {
            decision:
              "Het productiedomein van Vercel weegt zwaarder dan SITE_URL",
            alternative: "Alleen de environment variable vertrouwen",
            reason:
              "Na het hernoemen van het project wezen alle canonicals naar een domein dat 404 gaf. Het platform kent het live domein, dus dat wint.",
          },
          {
            decision: "Het Arabische font pas laden wanneer nodig",
            alternative: "Alle fonts op elke pagina preloaden",
            reason:
              "Vier Arabische gewichten werden gepreload op EN- en NL-pagina's die ze nooit gebruiken: ongeveer 134 KB per bezoek.",
          },
        ],
        ar: [
          {
            decision: "React 19 useActionState بدل react-hook-form",
            alternative: "react-hook-form مع Zod resolver",
            reason:
              "مخطط Zod مشترك يتحقق على العميل والخادم؛ ومكتبة النماذج ستضيف اعتماديتين مقابل سلوك توفره المنصة الآن.",
          },
          {
            decision: "تحويل mailto عند غياب مزوّد بريد",
            alternative: "تعطيل النموذج حتى إعداد Resend",
            reason:
              "النموذج يعمل من أول نشر، ولوحة التحويل تحتفظ برابط mailto حقيقي كبديل للمتصفحات التي تمنع فتح التطبيقات.",
          },
          {
            decision: "نطاق الإنتاج في Vercel يتقدّم على SITE_URL",
            alternative: "الاعتماد على متغيّر البيئة وحده",
            reason:
              "بعد إعادة تسمية المشروع أشارت كل روابط canonical إلى نطاق يعيد 404. المنصة تعرف النطاق الحقيقي، لذا يتقدّم.",
          },
          {
            decision: "تحميل الخط العربي عند الحاجة",
            alternative: "تحميل مسبق لكل الخطوط في كل صفحة",
            reason:
              "أربعة أوزان عربية كانت تُحمّل مسبقًا في صفحات EN وNL التي لا تستخدمها، بتكلفة نحو ١٣٤ كيلوبايت لكل زيارة.",
          },
        ],
      },
      outcome: {
        en: [
          "27 pages prerendered across three locales.",
          "18 end-to-end tests covering filters, the contact form, RTL chrome and mobile navigation, enforced in CI.",
          "Lighthouse on production: 95 performance on EN, 99 on AR, and 100 for accessibility, best practices and SEO.",
          "Font preloads reduced from six files to two on the Latin locales.",
        ],
        nl: [
          "27 pagina's vooraf gerenderd in drie talen.",
          "18 end-to-end tests voor filters, het contactformulier, RTL-chrome en mobiele navigatie, afgedwongen in CI.",
          "Lighthouse op productie: 95 performance op EN, 99 op AR en 100 voor toegankelijkheid, best practices en SEO.",
          "Font-preloads teruggebracht van zes bestanden naar twee op de Latijnse talen.",
        ],
        ar: [
          "٢٧ صفحة تُرندَر مسبقًا بثلاث لغات.",
          "١٨ اختبارًا شاملًا تغطي الفلاتر ونموذج التواصل وواجهة RTL والتنقّل على الجوال، ضمن CI.",
          "Lighthouse على الإنتاج: ٩٥ أداءً في EN و٩٩ في AR و١٠٠ في سهولة الوصول وأفضل الممارسات وSEO.",
          "خُفّض التحميل المسبق للخطوط من ستة ملفات إلى اثنين في اللغات اللاتينية.",
        ],
      },
      lessons: {
        en: [
          "Partial prerendering streams the shell before the page resolves, so an unknown slug answers 200 with a noindex tag on the first request. A proxy-level slug check is the fix if a hard 404 ever matters.",
          "Route-level metadata replaces openGraph wholesale: the Open Graph image has to be repeated per route or it silently disappears from every page below the layout.",
          "Build-time values are frozen into prerendered HTML, so changing an environment variable does nothing until the deployment rebuilds.",
        ],
        nl: [
          "Partial prerendering streamt de shell voordat de pagina klaar is, dus een onbekende slug antwoordt bij de eerste aanvraag met 200 en een noindex-tag. Een slug-check in de proxy is de oplossing als een harde 404 ooit nodig is.",
          "Metadata op routeniveau vervangt openGraph in zijn geheel: de Open Graph-afbeelding moet per route opnieuw worden meegegeven, anders verdwijnt hij stil van elke pagina onder de layout.",
          "Build-time waarden worden in de vooraf gerenderde HTML vastgezet, dus een environment variable wijzigen heeft geen effect tot de deployment opnieuw bouwt.",
        ],
        ar: [
          "العرض الجزئي المسبق يبثّ الهيكل قبل اكتمال الصفحة، لذا يعيد المسار المجهول ٢٠٠ مع وسم noindex في أول طلب. وفحص المسار في الوسيط هو الحل إن احتجنا 404 صريحًا.",
          "بيانات المسار الوصفية تستبدل openGraph بالكامل: يجب تكرار صورة Open Graph في كل مسار وإلا تختفي بصمت من كل صفحة تحت التخطيط.",
          "قيم وقت البناء تُثبّت في HTML المُولّد مسبقًا، لذا تغيير متغيّر بيئة لا يفعل شيئًا حتى يُعاد بناء النشر.",
        ],
      },
      highlights: [],
    },
  },
]);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
