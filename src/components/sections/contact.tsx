import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import { ContactForm } from "@/components/sections/contact-form";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="border-border/60 border-t">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
        <div className="border-border bg-card relative overflow-hidden rounded-3xl border px-6 py-12 sm:px-10 lg:px-12 lg:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.86_0.2_128/0.12),transparent_65%)]"
          />

          <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
            <div>
              <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 max-w-md text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {t("title")}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed sm:text-base">
                {t("body")}
              </p>

              <div className="text-muted-foreground mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="size-4" aria-hidden />
                  {t("email")}
                </a>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                >
                  <GithubIcon className="size-4" aria-hidden />
                  {t("github")}
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                >
                  <LinkedinIcon className="size-4" aria-hidden />
                  {t("linkedin")}
                </a>
              </div>
            </div>

            <div className="border-border/60 bg-background/50 rounded-2xl border p-5 sm:p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
