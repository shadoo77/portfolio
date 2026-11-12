import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://127.0.0.1:${PORT}`;

// CI builds once in an earlier step, so the web server only has to start.
const startCommand =
  process.env.E2E_SKIP_BUILD === "1"
    ? `pnpm start --port ${PORT}`
    : `pnpm build && pnpm start --port ${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], baseURL },
    },
  ],
  webServer: {
    command: startCommand,
    // The suite must never send real mail, even when a local .env holds a key.
    env: { RESEND_API_KEY: "" },
    url: `${baseURL}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
