import { useLocale, useTranslations } from "next-intl";
import { experience } from "@/config/experience";
import { SectionHeading } from "@/components/shared/section-heading";

export function Experience() {
  const t = useTranslations("Experience");
  const locale = useLocale();

  return (
    <section id="experience" className="border-border/60 border-t">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <ol className="mt-12 max-w-3xl">
          {experience.map((job, index) => {
            const group = job.group?.[locale];
            const previousGroup = experience[index - 1]?.group?.[locale];
            const showGroup = Boolean(group) && group !== previousGroup;

            return (
              <li
                key={job.company}
                className="border-foreground/15 relative border-s ps-6 pb-10 last:pb-0"
              >
                <span
                  aria-hidden
                  className="bg-primary ring-background absolute start-0 top-1.5 -ms-[5px] size-2.5 rounded-full ring-4"
                />

                {showGroup ? (
                  <p className="text-muted-foreground mb-3 font-mono text-[10px] tracking-widest uppercase">
                    {group}
                  </p>
                ) : null}

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-semibold tracking-tight">
                    {job.role}
                  </h3>
                  <span className="text-muted-foreground font-mono text-xs">
                    {job.period[locale]}
                  </span>
                </div>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  {job.company} · {job.location}
                </p>

                <ul className="text-muted-foreground mt-3 space-y-1.5 ps-4 text-sm leading-relaxed">
                  {job.bullets[locale].map((bullet) => (
                    <li key={bullet} className="marker:text-border list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
