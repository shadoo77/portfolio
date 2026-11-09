import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function Header() {
  const t = useTranslations("Nav");

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          dir="ltr"
          className="font-mono text-sm font-semibold tracking-tight"
          aria-label="shadi.dev — home"
        >
          shadi<span className="text-primary">.</span>
        </Link>

        <nav className="text-muted-foreground hidden items-center gap-7 text-sm md:flex">
          <a href="#work" className="hover:text-foreground transition-colors">
            {t("work")}
          </a>
          <a href="#about" className="hover:text-foreground transition-colors">
            {t("about")}
          </a>
          <a
            href="#contact"
            className="hover:text-foreground transition-colors"
          >
            {t("contact")}
          </a>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href="https://github.com/shadoo77"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:bg-muted hover:text-foreground hidden rounded-md p-1.5 transition-colors sm:inline-flex"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/shadi-amr/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:bg-muted hover:text-foreground hidden rounded-md p-1.5 transition-colors sm:inline-flex"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <LocaleSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" className="ms-1 hidden sm:inline-flex">
            <a href="mailto:shadi.omar077@gmail.com">
              <Mail data-icon="inline-start" className="size-3.5" />
              {t("contact")}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
