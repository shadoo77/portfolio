import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { ScrollHeader } from "@/components/layout/scroll-header";

export function Header() {
  const t = useTranslations("Nav");

  return (
    <ScrollHeader>
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-6 transition-[height] duration-300 ease-out group-data-[scrolled=true]:h-14 motion-reduce:transition-none lg:h-24 lg:group-data-[scrolled=true]:h-16">
        <Link
          href="/"
          dir="ltr"
          className="font-mono text-xl font-semibold tracking-tight transition-[font-size] duration-300 group-data-[scrolled=true]:text-lg motion-reduce:transition-none sm:text-2xl sm:group-data-[scrolled=true]:text-xl"
          aria-label="shadi.dev — home"
        >
          Shadi<span className="text-primary">.</span>
        </Link>

        <nav className="text-muted-foreground hidden items-center gap-8 text-[15px] transition-[gap] duration-300 group-data-[scrolled=true]:gap-6 md:flex">
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
            className="text-muted-foreground hover:bg-muted hover:text-foreground hidden rounded-md p-2 transition-colors sm:inline-flex"
          >
            <GithubIcon className="size-4.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/shadi-amr/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:bg-muted hover:text-foreground hidden rounded-md p-2 transition-colors sm:inline-flex"
          >
            <LinkedinIcon className="size-4.5" />
          </a>
          <LocaleSwitcher />
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="ms-1 hidden h-9 px-4 sm:inline-flex"
          >
            <a href="mailto:shadi.omar077@gmail.com">
              <Mail data-icon="inline-start" className="size-3.5" />
              {t("contact")}
            </a>
          </Button>
        </div>
      </div>
    </ScrollHeader>
  );
}
