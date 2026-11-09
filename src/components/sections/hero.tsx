import Image from "next/image";
import { ArrowDown, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-9 items-center justify-center rounded-lg transition-colors"
    >
      {children}
    </a>
  );
}

export function Hero() {
  const t = useTranslations("Hero");

  const stats = [
    { value: "7+", label: t("stats.javascript") },
    { value: "7+", label: t("stats.react") },
    { value: "5+", label: t("stats.nextjs") },
  ];

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.86_0.2_128/0.1),transparent_60%)]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <div>
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 text-primary mb-6 gap-2"
          >
            <span className="relative flex size-1.5">
              <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-75" />
              <span className="bg-primary relative inline-flex size-1.5 rounded-full" />
            </span>
            {t("availability")}
          </Badge>

          <p className="text-muted-foreground mb-3 font-mono text-xs tracking-[0.2em] uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t("name")}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            {t("summary")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-10 px-5">
              <a href="#work">
                {t("viewWork")}
                <ArrowDown data-icon="inline-end" className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-10 px-5">
              <a href="#contact">{t("getInTouch")}</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-0.5">
              <SocialLink href={siteConfig.links.github} label="GitHub">
                <GithubIcon className="size-4" />
              </SocialLink>
              <SocialLink href={siteConfig.links.linkedin} label="LinkedIn">
                <LinkedinIcon className="size-4" />
              </SocialLink>
              <SocialLink
                href={`mailto:${siteConfig.email}`}
                label={siteConfig.email}
              >
                <Mail className="size-4" />
              </SocialLink>
            </div>
            <span aria-hidden className="bg-border h-4 w-px" />
            <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
              <MapPin className="size-3.5" />
              {t("location")}
            </span>
          </div>

          <dl className="border-border/70 mt-12 grid max-w-md grid-cols-3 gap-6 border-t pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:ms-auto">
          <div
            aria-hidden
            className="border-primary/20 bg-primary/5 absolute -inset-3 -z-10 rounded-[2rem] border"
          />
          <div className="border-border bg-card relative overflow-hidden rounded-[1.75rem] border">
            <Image
              src="/portrait.jpg"
              alt={t("portraitAlt")}
              width={1024}
              height={1024}
              priority
              sizes="(max-width: 1024px) 80vw, 384px"
              className="aspect-square w-full object-cover"
            />
            <div
              aria-hidden
              className="from-background/60 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
            />
          </div>
          <div className="border-border bg-card/90 absolute end-4 -bottom-4 rounded-xl border px-3 py-2 shadow-sm backdrop-blur">
            <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
              {t("basedIn")}
            </p>
            <p className="text-xs font-medium">{t("location")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
