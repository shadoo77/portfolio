"use client";

import { useActionState, useEffect, useState } from "react";
import { CircleCheck, Loader2, Mail, Send, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "@/lib/actions/contact";
import {
  HONEYPOT_FIELD,
  initialContactState,
  type ContactErrorCode,
} from "@/lib/schemas/contact";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="text-destructive mt-1.5 text-xs">
      {message}
    </p>
  );
}

function StatusPanel({
  icon,
  title,
  body,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div role="status">
      {icon}
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        {body}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialContactState,
  );
  const [dismissed, setDismissed] = useState(false);

  const errorMessages: Record<ContactErrorCode, string> = {
    nameMin: t("errors.nameMin"),
    nameMax: t("errors.nameMax"),
    emailInvalid: t("errors.emailInvalid"),
    messageMin: t("errors.messageMin"),
    messageMax: t("errors.messageMax"),
  };

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;
  const errorFor = (field: "name" | "email" | "message") => {
    const code = fieldErrors?.[field];
    return code ? errorMessages[code] : undefined;
  };

  const resolved = !dismissed && state.status !== "idle";

  useEffect(() => {
    if (state.status === "mailto" && state.mailto) {
      // Best effort: some browsers block protocol launches from async code, so
      // the panel below always offers a real link as the fallback.
      window.location.href = state.mailto;
    }

    if (state.status === "error" && !state.fieldErrors) {
      toast.error(t("genericError"));
    }
  }, [state, t]);

  if (resolved && state.status === "success") {
    return (
      <StatusPanel
        icon={<CircleCheck className="text-primary size-6" aria-hidden />}
        title={t("successTitle")}
        body={t("successBody")}
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setDismissed(true)}
        >
          {t("sendAnother")}
        </Button>
      </StatusPanel>
    );
  }

  if (resolved && state.status === "mailto") {
    return (
      <StatusPanel
        icon={<Mail className="text-primary size-6" aria-hidden />}
        title={t("fallbackTitle")}
        body={t("fallbackBody")}
      >
        <Button asChild size="sm">
          <a href={state.mailto}>
            <Mail data-icon="inline-start" className="size-3.5" aria-hidden />
            {t("fallbackAction")}
          </a>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setDismissed(true)}
        >
          {t("sendAnother")}
        </Button>
      </StatusPanel>
    );
  }

  if (resolved && state.status === "error" && !state.fieldErrors) {
    return (
      <StatusPanel
        icon={<TriangleAlert className="text-destructive size-6" aria-hidden />}
        title={t("errorTitle")}
        body={t("genericError")}
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setDismissed(true)}
        >
          {t("tryAgain")}
        </Button>
      </StatusPanel>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={() => setDismissed(false)}
      className="grid gap-4 sm:grid-cols-2"
    >
      <div>
        <Label htmlFor="contact-name">{t("name")}</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          placeholder={t("namePlaceholder")}
          aria-invalid={Boolean(errorFor("name"))}
          aria-describedby={errorFor("name") ? "contact-name-error" : undefined}
          className="mt-2 h-10"
        />
        <FieldError id="contact-name-error" message={errorFor("name")} />
      </div>

      <div>
        <Label htmlFor="contact-email">{t("email")}</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          dir="ltr"
          autoComplete="email"
          required
          placeholder={t("emailPlaceholder")}
          aria-invalid={Boolean(errorFor("email"))}
          aria-describedby={
            errorFor("email") ? "contact-email-error" : undefined
          }
          className="mt-2 h-10"
        />
        <FieldError id="contact-email-error" message={errorFor("email")} />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="contact-message">{t("message")}</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder={t("messagePlaceholder")}
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={
            errorFor("message") ? "contact-message-error" : undefined
          }
          className="mt-2"
        />
        <FieldError id="contact-message-error" message={errorFor("message")} />
      </div>

      {/* Honeypot: real visitors never see or focus this field. */}
      <div aria-hidden className="hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground max-w-[24ch] text-xs leading-relaxed">
          {t("privacyNote")}
        </p>
        <Button
          type="submit"
          disabled={pending}
          className="h-10 w-full px-5 sm:w-auto"
        >
          {pending ? (
            <Loader2
              data-icon="inline-start"
              className="size-4 animate-spin"
              aria-hidden
            />
          ) : (
            <Send data-icon="inline-start" className="size-4" aria-hidden />
          )}
          {pending ? t("sending") : t("submit")}
        </Button>
      </div>
    </form>
  );
}
