"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { env } from "@/lib/env";
import {
  contactSchema,
  isHoneypotFilled,
  readContactPayload,
  type ContactErrorCode,
  type ContactPayload,
  type ContactState,
} from "@/lib/schemas/contact";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_MAX_CLIENTS = 500;

/**
 * Per-instance only: serverless functions do not share memory, so this stops
 * casual abuse rather than a determined attacker. A shared store is a v1.1
 * concern.
 */
const attempts = new Map<string, number[]>();

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const recent = (attempts.get(clientKey) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  recent.push(now);
  attempts.set(clientKey, recent);

  if (attempts.size > RATE_LIMIT_MAX_CLIENTS) {
    for (const [key, times] of attempts) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        attempts.delete(key);
      }
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

async function getClientKey() {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");

  return (
    forwarded?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown"
  );
}

function buildMailto({ name, email, message }: ContactPayload) {
  const subject = encodeURIComponent(`Portfolio contact — ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

  return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
}

export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Pretend success so bots get no signal, but never send anything.
  if (isHoneypotFilled(formData)) {
    return { status: "success" };
  }

  const payload = readContactPayload(formData);
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;

    return {
      status: "error",
      fieldErrors: {
        name: fieldErrors.name?.[0] as ContactErrorCode | undefined,
        email: fieldErrors.email?.[0] as ContactErrorCode | undefined,
        message: fieldErrors.message?.[0] as ContactErrorCode | undefined,
      },
    };
  }

  if (isRateLimited(await getClientKey())) {
    return { status: "error" };
  }

  const mailto = buildMailto(parsed.data);

  // No mail provider configured yet: hand the message to the visitor's client.
  if (!env.RESEND_API_KEY) {
    return { status: "mailto", mailto };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: env.RESEND_FROM,
    to: siteConfig.email,
    replyTo: parsed.data.email,
    subject: `Portfolio contact — ${parsed.data.name}`,
    text: [
      `From: ${parsed.data.name} <${parsed.data.email}>`,
      "",
      parsed.data.message,
    ].join("\n"),
  });

  if (error) {
    // A revoked key, quota limit or unverified sender should not dead-end the
    // visitor: hand the message to their mail client instead.
    console.error(
      "Contact form delivery failed, falling back to mailto:",
      error,
    );
    return { status: "mailto", mailto };
  }

  return { status: "success" };
}
