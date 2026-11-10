"use client";

import { Mail, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";

const links = [
  { href: "/work", key: "work" },
  { href: "/#experience", key: "experience" },
  { href: "/#about", key: "about" },
  { href: "/#contact", key: "contact" },
] as const;

export function MobileNav() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const side = locale === "ar" ? "left" : "right";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={t("openMenu")}
          className="md:hidden"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side={side}
        showCloseButton={false}
        aria-describedby={undefined}
        className="w-80 max-w-[85vw] gap-0 p-0"
      >
        <SheetHeader className="border-border/60 flex flex-row items-center justify-between border-b p-4">
          <SheetTitle
            dir="ltr"
            className="font-mono text-lg font-semibold tracking-tight"
          >
            {siteConfig.shortName}
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon-sm" aria-label={t("closeMenu")}>
              <X className="size-4" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <nav className="flex flex-col gap-1 p-4">
          {links.map((link) => (
            <SheetClose key={link.href} asChild>
              <Link
                href={link.href}
                className="hover:bg-muted rounded-lg px-3 py-3 text-base font-medium transition-colors"
              >
                {t(link.key)}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="border-border/60 mt-auto space-y-4 border-t p-4">
          <div className="flex items-center gap-1">
            <LocaleSwitcher />
            <ThemeToggle />
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
          </div>

          <Button asChild className="w-full">
            <a href={`mailto:${siteConfig.email}`}>
              <Mail data-icon="inline-start" className="size-4" />
              {t("contact")}
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
