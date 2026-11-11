import { ArrowUpRight, ExternalLink, MoveRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "cn";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/config/projects";
import { Badge } from "@/components/ui/badge";

const accents: Record<Project["accent"], string> = {
  lime: "from-lime-400/25 via-emerald-400/10 to-transparent",
  cyan: "from-cyan-400/25 via-sky-400/10 to-transparent",
  violet: "from-violet-400/25 via-fuchsia-400/10 to-transparent",
  amber: "from-amber-400/25 via-orange-400/10 to-transparent",
  emerald: "from-emerald-400/25 via-teal-400/10 to-transparent",
};

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const t = useTranslations("Work");
  const locale = useLocale();
  const href = `/work/${project.slug}`;

  return (
    <article className="group border-border bg-card hover:border-primary/40 flex flex-col overflow-hidden rounded-2xl border transition-colors">
      <Link href={href} className="block">
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
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">
            <Link href={href} className="hover:text-primary transition-colors">
              {project.name}
            </Link>
          </h3>
          <span className="text-muted-foreground font-mono text-xs">
            {project.year}
          </span>
        </div>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {project.tagline[locale]}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
          <Link
            href={href}
            className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            {t("readProject")}
            <MoveRight className="size-3.5" />
          </Link>

          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
            >
              {t("code")}
              <ArrowUpRight className="size-3.5" />
            </a>
          ) : null}

          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
            >
              {t("live")}
              <ExternalLink className="size-3.5" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
