import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "cn";
import { projects } from "@/config/projects";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";

const accents: Record<(typeof projects)[number]["accent"], string> = {
  lime: "from-lime-400/25 via-emerald-400/10 to-transparent",
  cyan: "from-cyan-400/25 via-sky-400/10 to-transparent",
  violet: "from-violet-400/25 via-fuchsia-400/10 to-transparent",
  amber: "from-amber-400/25 via-orange-400/10 to-transparent",
};

export function SelectedWork() {
  const t = useTranslations("Work");
  const locale = useLocale();

  return (
    <section id="work" className="border-border/60 border-t">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="group border-border bg-card hover:border-primary/40 flex flex-col overflow-hidden rounded-2xl border transition-colors"
            >
              <div
                className={cn(
                  "border-border relative h-40 overflow-hidden border-b bg-gradient-to-br",
                  accents[project.accent],
                )}
              >
                <span
                  aria-hidden
                  className="text-foreground/[0.06] absolute -end-2 -top-8 font-mono text-[7rem] leading-none font-semibold"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-0 flex items-end p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-border/70 bg-background/60 backdrop-blur"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {project.name}
                  </h3>
                  <span className="text-muted-foreground font-mono text-xs">
                    {project.year}
                  </span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {project.tagline[locale]}
                </p>

                <div className="mt-5 pt-1">
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
                    >
                      {t("code")}
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground font-mono text-[11px] tracking-wider uppercase">
                      {t("caseStudySoon")}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
