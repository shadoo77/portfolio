import { useTranslations } from "next-intl";
import { MoveRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { projects } from "@/config/projects";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/shared/project-card";

export function SelectedWork() {
  const t = useTranslations("Work");

  return (
    <section id="work" className="border-border/60 border-t">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-muted-foreground max-w-2xl text-xs leading-relaxed sm:text-sm">
            {t("note")}
          </p>
          <Link
            href="/work"
            className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            {t("allProjects")}
            <MoveRight className="size-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
