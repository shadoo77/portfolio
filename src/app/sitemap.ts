import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { projects } from "@/config/projects";

const paths = [
  "",
  "/work",
  ...projects.map((project) => `/work/${project.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const languages = {
      ...Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${siteConfig.url}/${locale}${path}`,
        ]),
      ),
      "x-default": `${siteConfig.url}/${routing.defaultLocale}${path}`,
    };

    return routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      changeFrequency: path === "" ? "monthly" : "yearly",
      priority: path === "" ? 1 : path === "/work" ? 0.8 : 0.6,
      alternates: { languages },
    }));
  });
}
