import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Direction } from "radix-ui";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { cn } from "cn";
import { ogLocales } from "@/lib/metadata";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  // Only Arabic pages render this family. Preloading it would make every EN/NL
  // page fetch ~130 KB it never uses, so it loads on demand instead.
  preload: false,
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: "Senior Frontend Developer",
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zeist",
    addressCountry: "NL",
  },
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  knowsLanguage: ["English", "Dutch", "Arabic"],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s — ${siteConfig.shortName}`,
    },
    description: t("description"),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = await getTranslations({ locale, namespace: "Nav" });

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        // Only Arabic renders with Plex, so only Arabic should preload it.
        locale === "ar" && plexArabic.variable,
        // Server-rendered default so the dark tokens and `dark:` variants are
        // correct on first paint without an inline script. next-themes swaps
        // this class after hydration when a visitor has chosen light.
        "dark",
        "h-full",
      )}
    >
      <body className="flex min-h-svh flex-col">
        {/* Motion sets opacity:0 in the SSR HTML; without JS nothing would ever
            reveal. This keeps the content readable when scripting is off. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal]{opacity:1!important;transform:none!important}</style>",
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <a
          href="#main"
          className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-100 focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
        >
          {t("skipToContent")}
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryProvider>
            <NuqsAdapter>
              <Direction.DirectionProvider dir={dir}>
                <NextIntlClientProvider>
                  <Header />
                  <div className="flex-1">{children}</div>
                  <Footer />
                  <Toaster position="bottom-center" />
                  {/* The scripts only exist on Vercel; locally they 404. */}
                  {process.env.VERCEL ? (
                    <>
                      <Analytics />
                      <SpeedInsights />
                    </>
                  ) : null}
                </NextIntlClientProvider>
              </Direction.DirectionProvider>
            </NuqsAdapter>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
