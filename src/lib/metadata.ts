import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

export const ogLocales = {
  en: "en_US",
  nl: "nl_NL",
  ar: "ar_AR",
} as const;

const ogImageSize = { width: 1200, height: 630 } as const;

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
  // Route-level metadata replaces `openGraph` wholesale, so the image has to be
  // repeated here instead of relying on the layout's file convention.
  const image = {
    url: `/${locale}/opengraph-image`,
    alt: siteConfig.name,
    ...ogImageSize,
  };

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
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
