import { z } from "zod";

/**
 * Vercel injects these for every deployment without a protocol. The project
 * production URL stays stable on preview builds, so previews canonicalise to
 * production instead of exposing their own throwaway origin.
 */
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

const vercelDeploymentUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

const configuredSiteUrl = process.env.SITE_URL?.replace(/\/+$/, "");

/**
 * On Vercel the platform knows which domain actually serves production, so it
 * wins: renaming the project can never leave a canonical pointing at a dead
 * host. `SITE_URL` stays as the explicit override everywhere else (and is
 * still honoured on Vercel when the platform variables are missing).
 */
const resolvedSiteUrl =
  vercelProductionUrl ??
  configuredSiteUrl ??
  vercelDeploymentUrl ??
  "http://localhost:3000";

if (
  configuredSiteUrl &&
  vercelProductionUrl &&
  configuredSiteUrl !== vercelProductionUrl
) {
  console.warn(
    `SITE_URL (${configuredSiteUrl}) differs from the Vercel production domain (${vercelProductionUrl}). Using the Vercel domain; update or remove SITE_URL to silence this.`,
  );
}

const envSchema = z.object({
  SITE_URL: z.url().default(resolvedSiteUrl),
  RESEND_API_KEY: z.string().min(1).optional(),
  GITHUB_TOKEN: z.string().min(1).optional(),
});

const parsed = envSchema.safeParse({
  SITE_URL: resolvedSiteUrl,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
});

if (!parsed.success) {
  console.error("Invalid environment variables:", z.treeifyError(parsed.error));
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
