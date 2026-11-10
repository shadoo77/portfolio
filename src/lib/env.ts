import { z } from "zod";

/**
 * Vercel injects these for every deployment without a protocol. The project
 * production URL stays stable on preview builds, so previews canonicalise to
 * production instead of exposing their own throwaway origin.
 */
const vercelSiteUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

const fallbackSiteUrl = vercelSiteUrl
  ? `https://${vercelSiteUrl}`
  : "http://localhost:3000";

const envSchema = z.object({
  SITE_URL: z
    .url()
    .default(fallbackSiteUrl)
    .transform((value) => value.replace(/\/+$/, "")),
  RESEND_API_KEY: z.string().min(1).optional(),
  GITHUB_TOKEN: z.string().min(1).optional(),
});

const parsed = envSchema.safeParse({
  SITE_URL: process.env.SITE_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
});

if (!parsed.success) {
  console.error("Invalid environment variables:", z.treeifyError(parsed.error));
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
