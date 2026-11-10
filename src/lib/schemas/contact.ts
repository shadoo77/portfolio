import { z } from "zod";

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  messageMin: 10,
  messageMax: 2000,
} as const;

/**
 * Error codes double as translation keys (`ContactForm.errors.*`), so the same
 * schema validates on the client and the server without duplicating copy.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.nameMin, "nameMin")
    .max(CONTACT_LIMITS.nameMax, "nameMax"),
  email: z.email("emailInvalid"),
  message: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.messageMin, "messageMin")
    .max(CONTACT_LIMITS.messageMax, "messageMax"),
});

export type ContactField = "name" | "email" | "message";

export type ContactErrorCode =
  "nameMin" | "nameMax" | "emailInvalid" | "messageMin" | "messageMax";

export type ContactPayload = z.infer<typeof contactSchema>;

/**
 * Lives here rather than in the action module: a `"use server"` file may only
 * export async functions.
 */
export type ContactState = {
  status: "idle" | "success" | "error" | "mailto";
  fieldErrors?: Partial<Record<ContactField, ContactErrorCode>>;
  mailto?: string;
};

export const initialContactState: ContactState = { status: "idle" };

export const HONEYPOT_FIELD = "website";

/** Honeypots are never validated — a filled one is silently accepted. */
export function isHoneypotFilled(formData: FormData) {
  const value = formData.get(HONEYPOT_FIELD);
  return typeof value === "string" && value.trim().length > 0;
}

export function readContactPayload(formData: FormData): ContactPayload {
  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
}
