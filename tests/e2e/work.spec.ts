import { expect, test } from "@playwright/test";

test.describe("work", () => {
  test("lists every project and filters by tag", async ({ page }) => {
    await page.goto("/en/work");

    await expect(
      page.getByRole("heading", { level: 1, name: "All side projects" }),
    ).toBeVisible();

    const cards = page.locator("main article");
    await expect(cards).toHaveCount(6);

    await page.getByRole("button", { name: "React", exact: true }).click();
    await expect(page).toHaveURL(/tag=React/);
    await expect(cards).toHaveCount(5);
    await expect(
      page.getByRole("button", { name: "React", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");

    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect(page).not.toHaveURL(/tag=/);
    await expect(cards).toHaveCount(6);
  });

  test("filter state survives a reload", async ({ page }) => {
    await page.goto("/en/work?tag=Remotion");

    await expect(page.locator("main article")).toHaveCount(1);
    await expect(
      page.getByRole("button", { name: "Remotion", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  test("renders a project case study", async ({ page }) => {
    await page.goto("/en/work/cv-maker-2026");

    await expect(
      page.getByRole("heading", { level: 1, name: "CV Maker 2026" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Overview" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "What I built" }),
    ).toBeVisible();
    for (const highlight of [
      "Four templates",
      "Accent theming",
      "Print-ready export",
    ]) {
      await expect(
        page.getByRole("heading", { level: 3, name: highlight }),
      ).toBeVisible();
    }

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute(
      "href",
      /\/en\/work\/cv-maker-2026$/,
    );

    // Route-level metadata replaces openGraph wholesale; the image must survive.
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  });

  test("renders a not-found page for an unknown slug", async ({ page }) => {
    const response = await page.goto("/en/work/does-not-exist");

    // PPR streams a 200 shell before the page resolves, so the first hit is a
    // "soft" 404: correct UI plus a noindex tag. Later hits serve a real 404.
    expect([200, 404]).toContain(response?.status());
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex",
    );
    await expect(
      page.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeVisible();
  });
});

test.describe("portfolio case study", () => {
  test("renders the full write-up", async ({ page }) => {
    await page.goto("/en/work/portfolio");

    await expect(
      page.getByRole("heading", { level: 1, name: "Portfolio 2026" }),
    ).toBeVisible();

    for (const section of [
      "Problem",
      "Constraints",
      "Approach",
      "Key decisions",
      "Outcome",
      "What I'd change",
    ]) {
      await expect(
        page.getByRole("heading", { level: 2, name: section }),
      ).toBeVisible();
    }

    await expect(page.getByText("TL;DR")).toBeVisible();
    await expect(
      page.getByText("React 19 useActionState instead of react-hook-form"),
    ).toBeVisible();
  });

  test("renders the write-up in Arabic", async ({ page }) => {
    await page.goto("/ar/work/portfolio");

    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(
      page.getByRole("heading", { level: 2, name: "المشكلة" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "أهم القرارات" }),
    ).toBeVisible();
  });
});
