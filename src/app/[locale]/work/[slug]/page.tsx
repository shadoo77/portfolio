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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border/60 mt-10 grid gap-5 border-t pt-10 lg:grid-cols-[0.35fr_0.65fr]">
      <h2 className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "WorkPage" });
  const caseStudyT = await getTranslations({ locale, namespace: "CaseStudy" });
  const work = await getTranslations({ locale, namespace: "Work" });

  const study = project.caseStudy;

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

        {study.tldr ? (
          <div className="border-primary/30 bg-primary/5 mt-10 rounded-2xl border p-5">
            <p className="text-primary font-mono text-[10px] tracking-widest uppercase">
              {caseStudyT("tldr")}
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed">
              {study.tldr[locale].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden className="text-primary">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Section title={t("overviewTitle")}>
          <p className="text-base leading-relaxed">{study.overview[locale]}</p>
        </Section>

        {study.problem ? (
          <Section title={caseStudyT("problem")}>
            <p className="text-base leading-relaxed">{study.problem[locale]}</p>
          </Section>
        ) : null}

        {study.constraints ? (
          <Section title={caseStudyT("constraints")}>
            <ul className="space-y-2 text-sm leading-relaxed">
              {study.constraints[locale].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden className="text-muted-foreground">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {study.approach ? (
          <Section title={caseStudyT("approach")}>
            <ol className="space-y-5">
              {study.approach[locale].map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden
                    className="text-primary/70 mt-0.5 font-mono text-xs tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        ) : null}

        {study.decisions ? (
          <Section title={caseStudyT("decisions")}>
            <ul className="space-y-3">
              {study.decisions[locale].map((decision) => (
                <li
                  key={decision.decision}
                  className="border-border/60 bg-card/40 rounded-xl border p-4"
                >
                  <p className="text-sm font-medium">{decision.decision}</p>
                  <dl className="mt-3 space-y-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                        {caseStudyT("alternative")}
                      </dt>
                      <dd className="text-muted-foreground mt-1 leading-relaxed">
                        {decision.alternative}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                        {caseStudyT("why")}
                      </dt>
                      <dd className="mt-1 leading-relaxed">
                        {decision.reason}
                      </dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {study.outcome ? (
          <Section title={caseStudyT("outcome")}>
            <ul className="space-y-2 text-sm leading-relaxed">
              {study.outcome[locale].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden className="text-primary">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {study.highlights.length > 0 ? (
          <Section title={t("highlightsTitle")}>
            <ul className="space-y-6">
              {study.highlights.map((highlight) => (
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
          </Section>
        ) : null}

        {study.lessons ? (
          <Section title={caseStudyT("lessons")}>
            <ul className="space-y-3 text-sm leading-relaxed">
              {study.lessons[locale].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden className="text-muted-foreground">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <Section title={t("stackTitle")}>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </Section>

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
