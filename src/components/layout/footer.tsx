import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-muted-foreground space-y-1 text-xs">
          <p>{t("rights", { year: 2026 })}</p>
          <p>{t("builtWith")}</p>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-8 items-center justify-center rounded-md transition-colors"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-8 items-center justify-center rounded-md transition-colors"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href="#main"
            className="text-muted-foreground hover:bg-muted hover:text-foreground ms-1 inline-flex size-8 items-center justify-center rounded-md transition-colors"
            aria-label={t("backToTop")}
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
