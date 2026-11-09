import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";

const languages = ["english", "dutch", "arabic"] as const;

export function About() {
  const t = useTranslations("About");
  const interests = t.raw("interests") as string[];

  return (
    <section id="about" className="border-border/60 border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
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
      </div>
    </section>
  );
}
