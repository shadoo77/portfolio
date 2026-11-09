import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { localizedMetadata } from "@/lib/metadata";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return localizedMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
  });
}

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <SelectedWork />
      <Experience />
      <About />
      <Contact />
    </main>
  );
}
