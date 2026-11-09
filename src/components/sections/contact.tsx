import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="border-border/60 border-t">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
        <div className="border-border bg-card relative overflow-hidden rounded-3xl border px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.86_0.2_128/0.12),transparent_65%)]"
          />

          <div className="relative">
            <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {t("title")}
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
              {t("body")}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-10 px-5">
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail data-icon="inline-start" className="size-4" />
                  {t("email")}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-10 px-5">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon data-icon="inline-start" className="size-4" />
                  {t("github")}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-10 px-5">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon data-icon="inline-start" className="size-4" />
                  {t("linkedin")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
