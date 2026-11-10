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
  /** Curated onto the landing page; /work always lists everything. */
  featured: z.boolean().default(true),
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
      tldr: {
        en: [
          "One typed CV model renders through four print-ready templates.",
          "The CV behind this portfolio was produced by it.",
          "No PDF library: the browser's own print output is the export.",
        ],
        nl: [
          "Eén getypt cv-model rendert door vier printklare templates.",
          "Het cv achter deze portfolio is ermee gemaakt.",
          "Geen pdf-bibliotheek: de printfunctie van de browser is de export.",
        ],
        ar: [
          "نموذج سيرة واحد آمن النوع يُعرض عبر أربعة قوالب جاهزة للطباعة.",
          "السيرة الذاتية وراء هذا الموقع أُنتجت به.",
          "بلا مكتبة PDF: مخرجات الطباعة من المتصفح هي التصدير.",
        ],
      },
      problem: {
        en: "Keeping a CV in sync is a formatting problem disguised as a content problem. Every variant — Dutch or English, design-forward or ATS-safe — meant a second document that quietly drifted from the first.",
        nl: "Een cv actueel houden is een opmaakprobleem dat zich voordoet als een contentprobleem. Elke variant — Nederlands of Engels, design of ATS-veilig — betekende een tweede document dat stil uit de pas liep.",
        ar: "إبقاء السيرة محدّثة مشكلة تنسيق تتنكّر في هيئة مشكلة محتوى. كل نسخة — هولندية أو إنجليزية، بتصميم جريء أو متوافقة مع ATS — كانت تعني مستندًا ثانيًا يبتعد بصمت عن الأول.",
      },
      constraints: {
        en: [
          "Print fidelity: what the browser prints has to match the preview, page breaks included.",
          "No backend and no account; everything runs in the browser.",
          "Four visual directions from a single data source.",
        ],
        nl: [
          "Printkwaliteit: wat de browser print moet overeenkomen met de preview, inclusief paginabreuken.",
          "Geen backend en geen account; alles draait in de browser.",
          "Vier visuele richtingen uit één databron.",
        ],
        ar: [
          "دقة الطباعة: ما يطبعه المتصفح يجب أن يطابق المعاينة، بما في ذلك فواصل الصفحات.",
          "بلا خادم وبلا حساب؛ كل شيء يعمل في المتصفح.",
          "أربعة اتجاهات بصرية من مصدر بيانات واحد.",
        ],
      },
      approach: {
        en: [
          {
            title: "Model the CV once",
            body: "CvData is a typed shape covering profile, experience, education, skills, languages and interests. Templates receive it and render; none of them own content.",
          },
          {
            title: "Colour as data, not classes",
            body: "A colour map resolves each accent to the class strings a template needs, so switching palettes never touches layout code.",
          },
          {
            title: "Print is a stylesheet problem",
            body: "Instead of a PDF library, explicit print rules hide the control panel, force page breaks and keep backgrounds, so the browser dialog is the export.",
          },
        ],
        nl: [
          {
            title: "Het cv één keer modelleren",
            body: "CvData is een getypeerde vorm met profiel, ervaring, opleiding, vaardigheden, talen en interesses. Templates krijgen die data en renderen; geen enkele template bezit content.",
          },
          {
            title: "Kleur als data, niet als classes",
            body: "Een kleurenkaart vertaalt elk accent naar de class-strings die een template nodig heeft, zodat een paletwissel nooit lay-outcode raakt.",
          },
          {
            title: "Printen is een stylesheet-probleem",
            body: "In plaats van een pdf-bibliotheek verbergen expliciete printregels het bedieningspaneel, forceren ze paginabreuken en behouden ze achtergronden. Het browserdialoog is de export.",
          },
        ],
        ar: [
          {
            title: "نمذجة السيرة مرة واحدة",
            body: "CvData بنية آمنة النوع تغطي الملف الشخصي والخبرة والتعليم والمهارات واللغات والاهتمامات. القوالب تستقبلها وتعرضها، ولا يملك أي قالب المحتوى.",
          },
          {
            title: "اللون كبيانات لا كأصناف",
            body: "خريطة ألوان تحوّل كل لون رئيسي إلى أصناف CSS التي يحتاجها القالب، فتبديل اللوحة لا يمسّ كود التخطيط.",
          },
          {
            title: "الطباعة مشكلة أنماط",
            body: "بدل مكتبة PDF، قواعد طباعة صريحة تخفي لوحة التحكم وتفرض فواصل الصفحات وتحافظ على الخلفيات، فيكون حوار المتصفح هو التصدير.",
          },
        ],
      },
      decisions: {
        en: [
          {
            decision: "Typed single source over per-template data",
            alternative: "A separate data file per template",
            reason:
              "One edit updates every template, so drift between variants becomes impossible rather than unlikely.",
          },
          {
            decision: "CSS print rules over a PDF library",
            alternative: "jsPDF or similar",
            reason:
              "No bundle cost, selectable text and working links in the output, and the preview is the document.",
          },
          {
            decision: "Four templates over one polished one",
            alternative: "A single, better-finished layout",
            reason:
              "Four layouts prove the model is genuinely data-agnostic instead of being shaped around one design.",
          },
        ],
        nl: [
          {
            decision: "Eén getypeerde bron in plaats van data per template",
            alternative: "Een apart databestand per template",
            reason:
              "Eén aanpassing werkt alle templates bij, dus drift tussen varianten wordt onmogelijk in plaats van onwaarschijnlijk.",
          },
          {
            decision: "Printregels in CSS in plaats van een pdf-bibliotheek",
            alternative: "jsPDF of vergelijkbaar",
            reason:
              "Geen bundelkosten, selecteerbare tekst en werkende links in de uitvoer, en de preview is het document.",
          },
          {
            decision: "Vier templates in plaats van één gepolijste",
            alternative: "Eén beter afgewerkte lay-out",
            reason:
              "Vier lay-outs bewijzen dat het model echt databron-onafhankelijk is en niet rond één ontwerp is gevormd.",
          },
        ],
        ar: [
          {
            decision: "مصدر واحد آمن النوع بدل بيانات لكل قالب",
            alternative: "ملف بيانات منفصل لكل قالب",
            reason:
              "تعديل واحد يحدّث كل القوالب، فيصبح انحراف النسخ مستحيلًا لا مجرد أمر غير محتمل.",
          },
          {
            decision: "قواعد طباعة CSS بدل مكتبة PDF",
            alternative: "jsPDF أو ما يشبهها",
            reason:
              "بلا تكلفة حزمة، ونص قابل للتحديد وروابط فعّالة في المخرجات، والمعاينة هي المستند نفسه.",
          },
          {
            decision: "أربعة قوالب بدل قالب واحد مصقول",
            alternative: "تخطيط واحد أكثر إتقانًا",
            reason:
              "أربعة تخطيطات تُثبت أن النموذج مستقل عن البيانات فعلًا لا مشكّل حول تصميم واحد.",
          },
        ],
      },
      outcome: {
        en: [
          "Four templates: Neo Minimal, Dark Tech, Creative Glass and an ATS-friendly layout.",
          "One typed data model and zero PDF dependencies, deployed to GitHub Pages.",
          "The CV behind this site is generated from it.",
        ],
        nl: [
          "Vier templates: Neo Minimal, Dark Tech, Creative Glass en een ATS-vriendelijke lay-out.",
          "Eén getypeerd datamodel en nul pdf-dependencies, gedeployed op GitHub Pages.",
          "Het cv achter deze site is ermee gegenereerd.",
        ],
        ar: [
          "أربعة قوالب: Neo Minimal وDark Tech وCreative Glass وتخطيط متوافق مع ATS.",
          "نموذج بيانات واحد آمن النوع وبلا أي اعتماد على PDF، منشور على GitHub Pages.",
          "السيرة الذاتية وراء هذا الموقع مولّدة منه.",
        ],
      },
      lessons: {
        en: [
          "The data is compiled into the app. Persisting edits in localStorage and then a shareable URL would turn a demo into a tool.",
          "The print hook is only window.print(); the real work lives in the stylesheet, which is worth saying plainly.",
        ],
        nl: [
          "De data is in de app gecompileerd. Bewerkingen bewaren in localStorage en daarna een deelbare URL zou van een demo een tool maken.",
          "De print-hook is alleen window.print(); het echte werk zit in de stylesheet, en dat mag gewoon gezegd worden.",
        ],
        ar: [
          "البيانات مُضمّنة في التطبيق. حفظ التعديلات في localStorage ثم رابط قابل للمشاركة سيحوّل العرض إلى أداة.",
          "خطاف الطباعة ليس سوى window.print()؛ العمل الحقيقي في ملف الأنماط، ويستحق أن يُقال بصراحة.",
        ],
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
            en: "Print fidelity comes from explicit print rules rather than a PDF library, so the browser's own output keeps text selectable and links live.",
            nl: "Printkwaliteit komt uit expliciete printregels in plaats van een pdf-bibliotheek, zodat de browseruitvoer tekst selecteerbaar en links werkend houdt.",
            ar: "دقة الطباعة تأتي من قواعد طباعة صريحة لا من مكتبة PDF، فتبقى نصوص مخرجات المتصفح قابلة للتحديد والروابط فعّالة.",
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
      en: "TanStack Router and Netlify Functions experiment aimed at an AI recipe helper.",
      nl: "Experiment met TanStack Router en Netlify Functions, gericht op een AI-receptenhulp.",
      ar: "تجربة على TanStack Router ودوال Netlify، موجّهة نحو مساعد وصفات بالذكاء الاصطناعي.",
    },
    repo: "https://github.com/shadoo77/recipes-app",
    accent: "amber",
    featured: false,
    caseStudy: {
      overview: {
        en: "An early-stage experiment: a TanStack Router app with a generated type-safe route tree, plus Netlify Functions behind a shared origin check. The recipe generation endpoint is still a stub, so this is a foundation rather than a product.",
        nl: "Een experiment in een vroeg stadium: een TanStack Router-app met een gegenereerde, typeveilige routestructuur, plus Netlify Functions achter een gedeelde origin-check. Het recepten-endpoint is nog een stub, dus dit is een basis, geen product.",
        ar: "تجربة في مرحلة مبكرة: تطبيق TanStack Router بشجرة مسارات مولّدة وآمنة النوع، مع دوال Netlify خلف فحص أصل مشترك. نقطة توليد الوصفات ما تزال هيكلًا مبدئيًا، فهذا أساس لا منتج.",
      },
      tldr: {
        en: [
          "A routing and serverless foundation, not a finished product.",
          "Typed route tree with lazy route modules.",
          "The AI endpoint is still a stub and the recipe UI has not been built.",
        ],
        nl: [
          "Een routing- en serverless-basis, geen afgewerkt product.",
          "Typeveilige routestructuur met lazy route-modules.",
          "Het AI-endpoint is nog een stub en de recepten-UI is er nog niet.",
        ],
        ar: [
          "أساس للتوجيه والدوال بلا خوادم، لا منتج مكتمل.",
          "شجرة مسارات آمنة النوع مع وحدات تُحمّل عند الحاجة.",
          "نقطة الذكاء الاصطناعي ما تزال هيكلًا مبدئيًا، وواجهة الوصفات لم تُبنَ.",
        ],
      },
      problem: {
        en: "I wanted a small, real project to try TanStack Router's file-based routing and Netlify Functions together, with an AI recipe helper as the eventual goal.",
        nl: "Ik zocht een klein, echt project om TanStack Router's bestandsrouting en Netlify Functions samen uit te proberen, met een AI-receptenhulp als einddoel.",
        ar: "أردت مشروعًا صغيرًا حقيقيًا لتجربة توجيه TanStack Router القائم على الملفات مع دوال Netlify، بهدف نهائي هو مساعد وصفات بالذكاء الاصطناعي.",
      },
      constraints: {
        en: [
          "Free Netlify hosting, so functions had to stay small.",
          "Any AI call must not expose a key in the bundle.",
        ],
        nl: [
          "Gratis Netlify-hosting, dus functies moesten klein blijven.",
          "Een AI-call mag geen sleutel in de bundle blootleggen.",
        ],
        ar: [
          "استضافة Netlify مجانية، فوجب أن تبقى الدوال صغيرة.",
          "أي نداء ذكاء اصطناعي يجب ألا يكشف مفتاحًا في الحزمة.",
        ],
      },
      approach: {
        en: [
          {
            title: "Typed routing first",
            body: "Routes are files; the plugin generates routeTree.gen.ts so links and params are checked at compile time.",
          },
          {
            title: "Functions behind a gate",
            body: "Every function is wrapped in withOriginCheck, which only allows the deployed and local origins.",
          },
        ],
        nl: [
          {
            title: "Eerst typeveilige routing",
            body: "Routes zijn bestanden; de plugin genereert routeTree.gen.ts zodat links en params bij compilatie gecontroleerd worden.",
          },
          {
            title: "Functies achter een poort",
            body: "Elke functie is gewrapt in withOriginCheck, dat alleen de gedeployde en lokale origins toestaat.",
          },
        ],
        ar: [
          {
            title: "التوجيه الآمن أولًا",
            body: "المسارات ملفات؛ والإضافة تولّد routeTree.gen.ts لتُفحص الروابط والمعاملات عند الترجمة.",
          },
          {
            title: "الدوال خلف بوابة",
            body: "كل دالة مغلّفة بـ withOriginCheck الذي يسمح فقط بأصل النشر والأصل المحلي.",
          },
        ],
      },
      decisions: {
        en: [
          {
            decision: "TanStack Router over React Router",
            alternative: "React Router with manual route configs",
            reason:
              "The generated tree makes routes and links type-safe without a hand-maintained config.",
          },
          {
            decision: "Netlify Functions over a separate backend",
            alternative: "A standalone API service",
            reason:
              "One deploy, no extra infrastructure, and the key stays server-side.",
          },
        ],
        nl: [
          {
            decision: "TanStack Router in plaats van React Router",
            alternative: "React Router met handmatige routeconfiguratie",
            reason:
              "De gegenereerde structuur maakt routes en links typeveilig zonder handmatig onderhoud.",
          },
          {
            decision: "Netlify Functions in plaats van een aparte backend",
            alternative: "Een losse API-service",
            reason:
              "Eén deploy, geen extra infrastructuur, en de sleutel blijft server-side.",
          },
        ],
        ar: [
          {
            decision: "TanStack Router بدل React Router",
            alternative: "React Router بإعداد مسارات يدوي",
            reason:
              "الشجرة المولّدة تجعل المسارات والروابط آمنة النوع دون إعداد يُصان يدويًا.",
          },
          {
            decision: "دوال Netlify بدل خادم منفصل",
            alternative: "خدمة API مستقلة",
            reason: "نشر واحد وبلا بنية إضافية، والمفتاح يبقى على الخادم.",
          },
        ],
      },
      outcome: {
        en: [
          "A working typed route tree and a deployed function scaffold.",
          "An origin-check middleware shared by every function.",
        ],
        nl: [
          "Een werkende typeveilige routestructuur en een gedeployed functieskelet.",
          "Een origin-check-middleware die elke functie deelt.",
        ],
        ar: [
          "شجرة مسارات آمنة النوع تعمل، وهيكل دوال منشور.",
          "وسيط فحص أصل مشترك بين كل الدوال.",
        ],
      },
      lessons: {
        en: [
          "It stopped at the foundation. Finishing the AI endpoint and the recipe UI is the next step; until then this is an experiment, not a case study.",
        ],
        nl: [
          "Het stopte bij de basis. Het AI-endpoint en de recepten-UI afmaken is de volgende stap; tot dan is dit een experiment, geen case study.",
        ],
        ar: [
          "توقّف عند الأساس. إكمال نقطة الذكاء الاصطناعي وواجهة الوصفات هو الخطوة التالية؛ وحتى ذلك الحين هذه تجربة لا دراسة حالة.",
        ],
      },
      highlights: [
        {
          title: {
            en: "Typed route tree",
            nl: "Typeveilige routestructuur",
            ar: "شجرة مسارات آمنة النوع",
          },
          body: {
            en: "File-based routes with a generated route tree, lazy route modules and type-safe links.",
            nl: "Bestandsroutes met een gegenereerde routestructuur, lazy route-modules en typeveilige links.",
            ar: "مسارات مبنية على الملفات مع شجرة مولّدة ووحدات تُحمّل عند الحاجة وروابط آمنة النوع.",
          },
        },
        {
          title: {
            en: "Serverless foundation",
            nl: "Serverless-basis",
            ar: "أساس بلا خوادم",
          },
          body: {
            en: "Netlify Functions behind a shared middleware that rejects requests from unknown origins.",
            nl: "Netlify Functions achter gedeelde middleware die verzoeken van onbekende origins weigert.",
            ar: "دوال Netlify خلف وسيط مشترك يرفض الطلبات من أصول غير معروفة.",
          },
        },
        {
          title: {
            en: "Not built yet",
            nl: "Nog niet gebouwd",
            ar: "لم يُبنَ بعد",
          },
          body: {
            en: "The AI endpoint still returns a placeholder and the recipe UI does not exist yet.",
            nl: "Het AI-endpoint geeft nog een placeholder terug en de recepten-UI bestaat nog niet.",
            ar: "نقطة الذكاء الاصطناعي ما تزال تعيد قيمة مؤقتة، وواجهة الوصفات غير موجودة بعد.",
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
      tldr: {
        en: [
          "Search and tour pages prefetched on the server, then hydrated into client-side filters and pagination.",
          "A catch-all API proxy keeps the travel API key server-side and forwards Accept-Language for localised results.",
          "EN/NL throughout, with a React Email template and a nodemailer route for enquiries.",
        ],
        nl: [
          "Zoek- en tourpagina's die op de server worden geprefetcht en daarna hydrateren naar client-side filters en paginering.",
          "Een catch-all API-proxy houdt de reis-API-sleutel server-side en stuurt Accept-Language door voor gelokaliseerde resultaten.",
          "EN/NL door de hele app, met een React Email-template en een nodemailer-route voor aanvragen.",
        ],
        ar: [
          "صفحات البحث والجولات تُجلب مسبقًا على الخادم ثم تُهيّأ إلى فلاتر وترقيم صفحات على العميل.",
          "وسيط API شامل يبقي مفتاح واجهة السفر على الخادم ويمرّر Accept-Language لنتائج مترجمة.",
          "الإنجليزية والهولندية في كل الصفحات، مع قالب React Email ومسار nodemailer للاستفسارات.",
        ],
      },
      problem: {
        en: "I wanted the booking flow I work on professionally — search, filters, detail pages, localisation — built end to end against a real travel API instead of mock data, to see where the seams actually are.",
        nl: "Ik wilde de boekingsflow die ik professioneel bouw — zoeken, filters, detailpagina's, lokalisatie — end-to-end tegen een echte reis-API bouwen in plaats van mockdata, om te zien waar de naden echt zitten.",
        ar: "أردت بناء تجربة الحجز التي أعمل عليها مهنيًا — بحث وفلاتر وصفحات تفاصيل وتعريب — من البداية إلى النهاية على واجهة سفر حقيقية لا بيانات وهمية، لأرى أين تقع المفاصل فعلًا.",
      },
      constraints: {
        en: [
          "The API key must never reach the browser.",
          "Search and detail pages need real content on first paint, not a loading spinner.",
          "Two locales with locale-prefixed routing.",
        ],
        nl: [
          "De API-sleutel mag nooit in de browser belanden.",
          "Zoek- en detailpagina's hebben echte content bij de eerste paint nodig, geen spinner.",
          "Twee talen met locale-prefixed routing.",
        ],
        ar: [
          "مفتاح الـ API يجب ألا يصل إلى المتصفح أبدًا.",
          "صفحات البحث والتفاصيل تحتاج محتوى حقيقيًا عند أول عرض لا مؤشر تحميل.",
          "لغتان مع توجيه يبدأ بمقطع اللغة.",
        ],
      },
      approach: {
        en: [
          {
            title: "Prefetch on the server",
            body: "Page components call queryClient.prefetchQuery for destinations and tags, then hand the dehydrated cache to HydrationBoundary.",
          },
          {
            title: "Proxy the API",
            body: "app/api/[...proxy]/route.ts re-issues the request server-side with the API key and the incoming Accept-Language header, so the client never sees either.",
          },
          {
            title: "Filter on the client",
            body: "Price, duration and rating filters plus pagination run against the hydrated data, so interaction costs no extra request.",
          },
          {
            title: "Localise routing and copy",
            body: "next-i18n-router with i18next resources gives locale-prefixed URLs, translated page metadata and a language switcher.",
          },
        ],
        nl: [
          {
            title: "Prefetchen op de server",
            body: "Pagina-componenten roepen queryClient.prefetchQuery aan voor bestemmingen en tags en geven de gedehydrateerde cache door aan HydrationBoundary.",
          },
          {
            title: "De API proxyen",
            body: "app/api/[...proxy]/route.ts herhaalt het verzoek server-side met de API-sleutel en de inkomende Accept-Language-header, zodat de client geen van beide ziet.",
          },
          {
            title: "Filteren op de client",
            body: "Filters op prijs, duur en beoordeling plus paginering werken op de gehydrateerde data, dus interactie kost geen extra verzoek.",
          },
          {
            title: "Routing en copy lokaliseren",
            body: "next-i18n-router met i18next-resources levert locale-prefixed URL's, vertaalde paginametadata en een taalwisselaar.",
          },
        ],
        ar: [
          {
            title: "الجلب المسبق على الخادم",
            body: "مكوّنات الصفحة تستدعي queryClient.prefetchQuery للوجهات والوسوم ثم تمرّر الذاكرة المُهيّأة إلى HydrationBoundary.",
          },
          {
            title: "توسيط الـ API",
            body: "app/api/[...proxy]/route.ts يعيد إصدار الطلب على الخادم مع مفتاح الـ API ورأس Accept-Language الوارد، فلا يرى العميل أيًا منهما.",
          },
          {
            title: "التصفية على العميل",
            body: "فلاتر السعر والمدة والتقييم مع ترقيم الصفحات تعمل على البيانات المُهيّأة، فالتفاعل لا يكلّف طلبًا إضافيًا.",
          },
          {
            title: "تعريب التوجيه والنصوص",
            body: "next-i18n-router مع موارد i18next يمنح مسارات تبدأ باللغة وبيانات وصفية مترجمة ومبدّل لغة.",
          },
        ],
      },
      decisions: {
        en: [
          {
            decision: "Server prefetch with HydrationBoundary",
            alternative: "Fetch everything in the client",
            reason:
              "First paint has content, and filters stay instant because the data is already in the cache.",
          },
          {
            decision: "Catch-all API proxy over browser calls",
            alternative: "Call the API directly with a public key",
            reason:
              "The key stays on the server and locale headers are forwarded without any client work.",
          },
          {
            decision: "next-i18n-router with i18next",
            alternative: "A hand-rolled locale context",
            reason:
              "Locale-prefixed routing, translations and page metadata come from one configuration.",
          },
        ],
        nl: [
          {
            decision: "Prefetch op de server met HydrationBoundary",
            alternative: "Alles in de client ophalen",
            reason:
              "De eerste paint heeft content en filters blijven direct, omdat de data al in de cache zit.",
          },
          {
            decision: "Catch-all API-proxy in plaats van browsercalls",
            alternative: "De API direct aanroepen met een publieke sleutel",
            reason:
              "De sleutel blijft op de server en locale-headers worden doorgegeven zonder werk in de client.",
          },
          {
            decision: "next-i18n-router met i18next",
            alternative: "Een zelfgemaakte locale-context",
            reason:
              "Locale-prefixed routing, vertalingen en paginametadata komen uit één configuratie.",
          },
        ],
        ar: [
          {
            decision: "جلب مسبق على الخادم مع HydrationBoundary",
            alternative: "جلب كل شيء في العميل",
            reason:
              "أول عرض يحمل محتوى، والفلاتر تبقى فورية لأن البيانات في الذاكرة أصلًا.",
          },
          {
            decision: "وسيط API شامل بدل نداءات المتصفح",
            alternative: "نداء الـ API مباشرة بمفتاح عام",
            reason:
              "المفتاح يبقى على الخادم ورؤوس اللغة تُمرّر دون أي عمل في العميل.",
          },
          {
            decision: "next-i18n-router مع i18next",
            alternative: "سياق لغة مكتوب يدويًا",
            reason: "توجيه يبدأ باللغة وترجمات وبيانات وصفية من إعداد واحد.",
          },
        ],
      },
      outcome: {
        en: [
          "Search with price, duration and rating filters, plus pagination.",
          "Tour detail pages with a destination/product split on the slug.",
          "EN/NL routing with translated page metadata.",
          "React Email template and a nodemailer mail route, with staging and production CI workflows.",
        ],
        nl: [
          "Zoeken met filters op prijs, duur en beoordeling, plus paginering.",
          "Tourdetailpagina's met een splitsing tussen bestemming en product op de slug.",
          "EN/NL-routing met vertaalde paginametadata.",
          "React Email-template en een nodemailer-mailroute, met staging- en productie-CI.",
        ],
        ar: [
          "بحث بفلاتر السعر والمدة والتقييم مع ترقيم صفحات.",
          "صفحات تفاصيل جولات بفصل بين الوجهة والمنتج على المسار.",
          "توجيه إنجليزي/هولندي مع بيانات وصفية مترجمة.",
          "قالب React Email ومسار بريد عبر nodemailer، مع سير عمل CI للتجربة والإنتاج.",
        ],
      },
      lessons: {
        en: [
          "The [...slug] catch-all covers destinations and products, but the branching is hard to read; explicit routes would age better.",
          "It runs on Next 14. Server Components and the metadata API have moved on since; upgrading is the first thing I would do.",
        ],
        nl: [
          "De [...slug]-catch-all dekt bestemmingen en producten, maar de vertakking is slecht leesbaar; expliciete routes zouden beter oud worden.",
          "Het draait op Next 14. Server Components en de metadata-API zijn sindsdien doorontwikkeld; upgraden is het eerste dat ik zou doen.",
        ],
        ar: [
          "المسار الشامل [...slug] يغطي الوجهات والمنتجات، لكن التفرّع صعب القراءة؛ المسارات الصريحة ستبقى أفضل مع الوقت.",
          "يعمل على Next 14، وقد تطوّرت مكوّنات الخادم وواجهة البيانات الوصفية منذ ذلك الحين؛ الترقية أول ما سأفعله.",
        ],
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
      tldr: {
        en: [
          "Documentary episodes as code: one composition per aspect ratio, shared scenes underneath.",
          "Captions come from the audio, not guesswork: Whisper.cpp runs locally and emits timed caption JSON.",
          "A motion library — dust, count-ups, rolling digits, tickers, glitch — keeps the visual language consistent.",
        ],
        nl: [
          "Documentaire-afleveringen als code: één compositie per beeldverhouding, met gedeelde scènes eronder.",
          "Ondertitels komen uit de audio, niet uit giswerk: Whisper.cpp draait lokaal en levert getimede caption-JSON.",
          "Een motion-bibliotheek — stof, count-ups, rollende cijfers, tickers, glitch — houdt de visuele taal consistent.",
        ],
        ar: [
          "حلقات وثائقية ككود: تركيب واحد لكل نسبة عرض، بمشاهد مشتركة تحته.",
          "الترجمات تأتي من الصوت لا من التخمين: Whisper.cpp يعمل محليًا وينتج JSON بترجمة موقوتة.",
          "مكتبة حركة — غبار وعدّادات وأرقام متدحرجة وأشرطة أخبار وglitch — تحافظ على اتساق اللغة البصرية.",
        ],
      },
      problem: {
        en: "Video editing is not reproducible. I wanted an episode to be a repository: change the script, re-render, and get the same timing, captions and motion every time.",
        nl: "Videomontage is niet reproduceerbaar. Ik wilde dat een aflevering een repository is: script aanpassen, opnieuw renderen, en elke keer dezelfde timing, ondertitels en motion krijgen.",
        ar: "مونتاج الفيديو غير قابل للتكرار. أردت أن تكون الحلقة مستودعًا: عدّل النص، أعد العرض، فتحصل على التوقيت والترجمات والحركة نفسها كل مرة.",
      },
      constraints: {
        en: [
          "Two aspect ratios from the same material: 1920×1080 long-form and 1080×1920 shorts.",
          "Captions accurate to the frame without hand-timing.",
          "No per-minute transcription service.",
        ],
        nl: [
          "Twee beeldverhoudingen uit hetzelfde materiaal: 1920×1080 long-form en 1080×1920 shorts.",
          "Ondertitels tot op het frame nauwkeurig zonder handmatig timen.",
          "Geen transcriptiedienst per minuut.",
        ],
        ar: [
          "نسبتا عرض من المادة نفسها: ١٩٢٠×١٠٨٠ للطويل و١٠٨٠×١٩٢٠ للمقاطع القصيرة.",
          "ترجمات دقيقة إلى الإطار دون توقيت يدوي.",
          "بلا خدمة تفريغ صوتي بالدقيقة.",
        ],
      },
      approach: {
        en: [
          {
            title: "One composition per format",
            body: "Root.tsx registers a landscape and a shorts composition, each with its own frame budget but the same scene components.",
          },
          {
            title: "Scenes own their timing",
            body: "Every scene folder carries constants, metadata and a transcript JSON, so a scene can be re-timed without touching its neighbours.",
          },
          {
            title: "Transcribe locally",
            body: "scripts/generate-captions.ts installs Whisper.cpp, resamples to 16 kHz with ffmpeg, transcribes with the base.en model and writes caption JSON.",
          },
          {
            title: "Motion atoms",
            body: "Dust particles, count-ups, rolling digits, ticker bars, glitch and three transition components are shared across episodes.",
          },
        ],
        nl: [
          {
            title: "Eén compositie per formaat",
            body: "Root.tsx registreert een landscape- en een shorts-compositie, elk met een eigen framebudget maar dezelfde scène-componenten.",
          },
          {
            title: "Scènes bezitten hun timing",
            body: "Elke scènemap bevat constanten, metadata en een transcript-JSON, zodat een scène opnieuw getimed kan worden zonder de buren te raken.",
          },
          {
            title: "Lokaal transcriberen",
            body: "scripts/generate-captions.ts installeert Whisper.cpp, resamplet naar 16 kHz met ffmpeg, transcribeert met het base.en-model en schrijft caption-JSON.",
          },
          {
            title: "Motion-atomen",
            body: "Stofdeeltjes, count-ups, rollende cijfers, tickerbalken, glitch en drie overgangscomponenten worden gedeeld tussen afleveringen.",
          },
        ],
        ar: [
          {
            title: "تركيب واحد لكل صيغة",
            body: "Root.tsx يسجّل تركيبًا أفقيًا وآخر للشورتس، لكل منهما ميزانية إطارات خاصة لكن بمكوّنات مشاهد واحدة.",
          },
          {
            title: "المشاهد تملك توقيتها",
            body: "كل مجلد مشهد يحمل ثوابت وبيانات وصفية وJSON للنص، فيمكن إعادة توقيت مشهد دون المساس بجيرانه.",
          },
          {
            title: "التفريغ محليًا",
            body: "scripts/generate-captions.ts يثبّت Whisper.cpp ويعيد أخذ العينات إلى ١٦ كيلوهرتز بـ ffmpeg ويفرّغ بنموذج base.en ويكتب JSON للترجمة.",
          },
          {
            title: "عناصر الحركة",
            body: "جزيئات الغبار والعدّادات والأرقام المتدحرجة وأشرطة الأخبار وglitch وثلاثة مكوّنات انتقال مشتركة بين الحلقات.",
          },
        ],
      },
      decisions: {
        en: [
          {
            decision: "Local Whisper over a hosted transcription API",
            alternative: "A paid speech-to-text service",
            reason:
              "No per-minute cost, and the audio never leaves the machine.",
          },
          {
            decision: "Per-scene constants and transcripts",
            alternative: "One large timeline file",
            reason:
              "Scenes stay independently editable and re-timable instead of being coupled through a shared file.",
          },
          {
            decision: "Shared motion atoms",
            alternative: "Bespoke effects per episode",
            reason:
              "The visual language stays consistent, and a new episode starts from a library rather than from scratch.",
          },
        ],
        nl: [
          {
            decision: "Lokale Whisper in plaats van een transcriptie-API",
            alternative: "Een betaalde speech-to-text-dienst",
            reason:
              "Geen kosten per minuut, en de audio verlaat de machine nooit.",
          },
          {
            decision: "Constanten en transcripten per scène",
            alternative: "Eén groot tijdlijnbestand",
            reason:
              "Scènes blijven los bewerkbaar en opnieuw te timen in plaats van gekoppeld via een gedeeld bestand.",
          },
          {
            decision: "Gedeelde motion-atomen",
            alternative: "Maatwerk-effecten per aflevering",
            reason:
              "De visuele taal blijft consistent en een nieuwe aflevering start vanuit een bibliotheek.",
          },
        ],
        ar: [
          {
            decision: "Whisper محلي بدل واجهة تفريغ مستضافة",
            alternative: "خدمة تحويل كلام إلى نص مدفوعة",
            reason: "بلا تكلفة بالدقيقة، والصوت لا يغادر الجهاز أبدًا.",
          },
          {
            decision: "ثوابت ونصوص لكل مشهد",
            alternative: "ملف توقيت واحد كبير",
            reason:
              "تبقى المشاهد قابلة للتعديل وإعادة التوقيت باستقلال بدل ربطها بملف مشترك.",
          },
          {
            decision: "عناصر حركة مشتركة",
            alternative: "مؤثرات مخصّصة لكل حلقة",
            reason:
              "تبقى اللغة البصرية متسقة، وتبدأ الحلقة الجديدة من مكتبة لا من الصفر.",
          },
        ],
      },
      outcome: {
        en: [
          "Landscape and shorts compositions generated from the same scene code.",
          "Three caption styles (YouTube, TikTok, line) plus an eulogy variant, all fed by one transcript.",
          "A transitions and motion library of roughly a dozen components.",
        ],
        nl: [
          "Landscape- en shorts-composities uit dezelfde scènecode.",
          "Drie captionstijlen (YouTube, TikTok, regel) plus een eulogy-variant, allemaal uit één transcript.",
          "Een overgangs- en motion-bibliotheek van ongeveer een dozijn componenten.",
        ],
        ar: [
          "تركيبان أفقي وقصير مولّدان من كود مشاهد واحد.",
          "ثلاثة أنماط ترجمة (يوتيوب وتيك توك وسطري) مع نسخة تأبين، كلها من نص واحد.",
          "مكتبة انتقالات وحركة من نحو اثني عشر مكوّنًا.",
        ],
      },
      lessons: {
        en: [
          "Root.tsx imports each episode directly; a registry would let new episodes land without touching the composition file.",
          "The caption pipeline assumes a clean 16 kHz mono track, so audio preparation is the next bottleneck to automate.",
        ],
        nl: [
          "Root.tsx importeert elke aflevering direct; een registry zou nieuwe afleveringen laten landen zonder het compositiebestand aan te raken.",
          "De caption-pipeline gaat uit van een schone 16 kHz mono-track, dus audio-voorbereiding is de volgende bottleneck om te automatiseren.",
        ],
        ar: [
          "Root.tsx يستورد كل حلقة مباشرة؛ سجل مركزي سيسمح بإضافة حلقات دون لمس ملف التركيب.",
          "مسار الترجمة يفترض مسارًا نقيًا أحادي القناة بتردد ١٦ كيلوهرتز، لذا تجهيز الصوت هو العقبة التالية للأتمتة.",
        ],
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
