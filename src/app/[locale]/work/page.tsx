import { Suspense } from "react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { localizedMetadata } from "@/lib/metadata";
import { SectionHeading } from "@/components/shared/section-heading";
import { WorkBrowser } from "@/components/work/work-browser";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "WorkPage" });

  return localizedMetadata({
    locale,
    path: "work",
    title: t("title"),
    description: t("description"),
  });
}

export default async function WorkPage({
  params,
}: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "WorkPage" });

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-24">
      <SectionHeading
        as="h1"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-10">
        <Suspense
          fallback={
            <div aria-hidden className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-muted h-8 w-20 animate-pulse rounded-full"
                />
              ))}
            </div>
          }
        >
          <WorkBrowser />
        </Suspense>
      </div>
    </main>
  );
}
