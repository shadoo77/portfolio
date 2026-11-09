import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

export const ogLocales = {
  en: "en_US",
  nl: "nl_NL",
  ar: "ar_AR",
} as const;

export function localizedMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const suffix = path ? `/${path.replace(/^\//, "")}` : "";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: {
        en: `/en${suffix}`,
        nl: `/nl${suffix}`,
        ar: `/ar${suffix}`,
        "x-default": `/en${suffix}`,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      url: `/${locale}${suffix}`,
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
