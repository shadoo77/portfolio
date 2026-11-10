import { expect, test } from "@playwright/test";

test.describe("work", () => {
  test("lists every project and filters by tag", async ({ page }) => {
    await page.goto("/en/work");

    await expect(
      page.getByRole("heading", { level: 1, name: "All side projects" }),
    ).toBeVisible();

    const cards = page.locator("main article");
    await expect(cards).toHaveCount(4);

    await page.getByRole("button", { name: "React", exact: true }).click();
    await expect(page).toHaveURL(/tag=React/);
    await expect(cards).toHaveCount(3);
    await expect(
      page.getByRole("button", { name: "React", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");

    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect(page).not.toHaveURL(/tag=/);
    await expect(cards).toHaveCount(4);
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
    await expect(page.getByRole("heading", { level: 3 })).toHaveCount(3);

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
