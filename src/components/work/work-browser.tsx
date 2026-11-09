"use client";

import { useQueryState, parseAsString } from "nuqs";
import { useTranslations } from "next-intl";
import { projects } from "@/config/projects";
import { ProjectCard } from "@/components/shared/project-card";
import { cn } from "cn";

const tags = Array.from(new Set(projects.flatMap((project) => project.tags)));

export function WorkBrowser() {
  const t = useTranslations("WorkPage");
  const [activeTag, setActiveTag] = useQueryState("tag", parseAsString);

  const visible = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => !activeTag || project.tags.includes(activeTag));

  return (
    <div>
      <div
        role="group"
        aria-label={t("filterLabel")}
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          aria-pressed={!activeTag}
          onClick={() => void setActiveTag(null)}
          className={cn(
            "border-border rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
            !activeTag
              ? "border-primary bg-primary text-primary-foreground"
              : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
        >
          {t("all")}
        </button>

        {tags.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={isActive}
              onClick={() => void setActiveTag(isActive ? null : tag)}
              className={cn(
                "border-border rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <p className="text-muted-foreground mt-6 font-mono text-xs tracking-wider uppercase">
        {t("count", { count: visible.length })}
      </p>

      {visible.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {visible.map(({ project, index }) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-10 text-sm">{t("empty")}</p>
      )}
    </div>
  );
}
