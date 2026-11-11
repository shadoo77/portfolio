import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test("renders the hero and primary navigation", async ({ page }) => {
    await page.goto("/en");

    await expect(
      page.getByRole("heading", { level: 1, name: "Mohamad Shadi Omar" }),
    ).toBeVisible();

    const nav = page.getByRole("navigation").first();
    for (const label of ["Work", "Experience", "About", "Contact"]) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("lists only the featured side projects", async ({ page }) => {
    await page.goto("/en");

    const work = page.locator("#work");
    await expect(work.getByRole("heading", { level: 3 })).toHaveCount(4);
    // Recipes App is an experiment, so it stays in /work but not on the landing page.
    await expect(work.getByText("Recipes App")).toHaveCount(0);
    await expect(work.getByText("Portfolio 2026")).toBeVisible();
    await expect(
      work.getByRole("heading", { level: 3, name: "Travel Hint" }),
    ).toBeVisible();
    // Next.js Viator stays in /work but no longer leads the landing page.
    await expect(work.getByText("Next.js Viator")).toHaveCount(0);
    await expect(
      work.getByRole("link", { name: "All projects" }),
    ).toBeVisible();
  });

  test("exposes canonical and hreflang alternates", async ({ page }) => {
    await page.goto("/en");

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /\/en$/);

    for (const lang of ["en", "nl", "ar", "x-default"]) {
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${lang}"]`),
      ).toHaveCount(1);
    }
  });

  test("emits Person structured data", async ({ page }) => {
    await page.goto("/en");

    const json = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();

    expect(json).toBeTruthy();
    const data = JSON.parse(json as string);
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Mohamad Shadi Omar");
    expect(data.knowsLanguage).toEqual(["English", "Dutch", "Arabic"]);
  });

  test("header anchor links land below the sticky header", async ({ page }) => {
    await page.goto("/en");
    await page
      .getByRole("navigation")
      .first()
      .getByRole("link", { name: "About" })
      .click();

    await expect(page).toHaveURL(/#about$/);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);

    const offset = await page.evaluate(() => {
      const section = document.getElementById("about");
      if (!section) return null;
      return Math.round(section.getBoundingClientRect().top);
    });

    // scroll-padding-top is 96px, so the section must not sit under the header.
    expect(offset).not.toBeNull();
    expect(offset as number).toBeGreaterThanOrEqual(60);
  });
});

test.describe("about", () => {
  test("lists the stack from the CV", async ({ page }) => {
    await page.goto("/en");

    const about = page.locator("#about");
    await expect(about.getByText("Skills")).toBeVisible();

    for (const skill of ["TypeScript", "Laravel", "PostgreSQL", "Cypress"]) {
      await expect(about.getByText(skill, { exact: true })).toBeVisible();
    }

    await expect(about.getByText("Dutch — intermediate (B1–B2)")).toBeVisible();
  });

  test("localises the skill groups", async ({ page }) => {
    await page.goto("/ar");

    const about = page.locator("#about");
    await expect(about.getByText("المهارات")).toBeVisible();
    await expect(about.getByText("الواجهة الخلفية")).toBeVisible();
    await expect(about.getByText("Laravel", { exact: true })).toBeVisible();
  });
});
