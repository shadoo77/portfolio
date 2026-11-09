import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { localizedMetadata } from "@/lib/metadata";
import { getProject, projects } from "@/config/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/icons";

export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  return localizedMetadata({
    locale,
    path: `work/${project.slug}`,
    title: project.name,
    description: project.tagline[locale],
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "WorkPage" });
  const work = await getTranslations({ locale, namespace: "Work" });

  return (
    <main id="main">
      <article className="mx-auto w-full max-w-4xl px-6 py-16 lg:py-24">
        <Link
          href="/work"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="size-3.5 rtl:rotate-180" />
          {t("back")}
        </Link>

        <div className="text-muted-foreground mt-8 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
          <span>{project.year}</span>
          <span aria-hidden>·</span>
          <span>{project.tags[0]}</span>
        </div>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {project.name}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg">
          {project.tagline[locale]}
        </p>

        {project.repo || project.live ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.repo ? (
              <Button asChild variant="outline" size="sm">
                <a href={project.repo} target="_blank" rel="noreferrer">
                  <GithubIcon data-icon="inline-start" className="size-3.5" />
                  {work("code")}
                </a>
              </Button>
            ) : null}
            {project.live ? (
              <Button asChild size="sm">
                <a href={project.live} target="_blank" rel="noreferrer">
                  <ExternalLink data-icon="inline-start" className="size-3.5" />
                  {work("live")}
                </a>
              </Button>
            ) : null}
          </div>
        ) : null}

        <div className="border-border/60 mt-12 grid gap-6 border-t pt-10 lg:grid-cols-[0.35fr_0.65fr]">
          <h2 className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
            {t("overviewTitle")}
          </h2>
          <p className="text-base leading-relaxed">
            {project.caseStudy.overview[locale]}
          </p>
        </div>

        <div className="border-border/60 mt-10 grid gap-6 border-t pt-10 lg:grid-cols-[0.35fr_0.65fr]">
          <h2 className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
            {t("highlightsTitle")}
          </h2>
          <ul className="space-y-6">
            {project.caseStudy.highlights.map((highlight) => (
              <li key={highlight.title[locale]}>
                <h3 className="font-semibold tracking-tight">
                  {highlight.title[locale]}
                </h3>
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {highlight.body[locale]}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-border/60 mt-10 grid gap-6 border-t pt-10 lg:grid-cols-[0.35fr_0.65fr]">
          <h2 className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
            {t("stackTitle")}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="border-border/60 mt-12 border-t pt-8">
          <Link
            href="/work"
            className="text-primary inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            <ArrowLeft className="size-3.5 rtl:rotate-180" />
            {t("moreWork")}
          </Link>
        </div>
      </article>
    </main>
  );
}
