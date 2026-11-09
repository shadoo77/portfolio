import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 py-32 text-center"
    >
      <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed sm:text-base">
        {t("body")}
      </p>
      <Button asChild className="mt-8">
        <Link href="/">{t("home")}</Link>
      </Button>
    </main>
  );
}
