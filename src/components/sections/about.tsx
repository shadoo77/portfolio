import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { skillGroups, type SkillGroupKey } from "@/config/skills";
import { Reveal } from "@/components/shared/reveal";

const languages = ["english", "dutch", "arabic"] as const;

export function About() {
  const t = useTranslations("About");
  const interests = t.raw("interests") as string[];

  const skillLabels: Record<SkillGroupKey, string> = {
    languages: t("skillGroups.languages"),
    frontend: t("skillGroups.frontend"),
    backend: t("skillGroups.backend"),
    data: t("skillGroups.data"),
    tooling: t("skillGroups.tooling"),
    ai: t("skillGroups.ai"),
  };

  return (
    <section id="about" className="border-border/60 border-t">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
        <Reveal className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

          <div>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              {t("body")}
            </p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                  {t("languagesTitle")}
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {languages.map((language) => (
                    <li key={language}>{t(`languages.${language}`)}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                  {t("interestsTitle")}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="border-border/60 mt-14 border-t pt-10" delay={0.05}>
          <h3 className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
            {t("skillsTitle")}
          </h3>
          <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.key}>
                <dt className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                  {skillLabels[group.key]}
                </dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
