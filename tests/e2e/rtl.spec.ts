import { expect, test } from "@playwright/test";

test.describe("arabic / rtl", () => {
  test("renders the document in RTL with translated chrome", async ({
    page,
  }) => {
    await page.goto("/ar");

    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

    await expect(
      page.getByRole("heading", { level: 1, name: "محمد شادي عمر" }),
    ).toBeVisible();

    const nav = page.getByRole("navigation").first();
    for (const label of ["الأعمال", "الخبرة", "نبذة", "تواصل"]) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("keeps the wordmark LTR inside the RTL layout", async ({ page }) => {
    await page.goto("/ar");

    const logo = page.locator("header a").first();
    await expect(logo).toHaveText("Shadi");
    await expect(logo).toHaveAttribute("dir", "ltr");

    // The brand sits at the inline start, which is the right edge in RTL.
    const box = await logo.boundingBox();
    const viewport = page.viewportSize();
    expect(box).not.toBeNull();
    expect(viewport).not.toBeNull();
    expect((box as { x: number }).x).toBeGreaterThan(
      (viewport as { width: number }).width / 2,
    );
  });

  test("localises the contact form", async ({ page }) => {
    await page.goto("/ar");

    await expect(page.locator("#contact-name")).toHaveCount(1);
    await expect(
      page.getByRole("button", { name: "أرسل الرسالة" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "لنبنِ شيئًا يدوم." }),
    ).toBeVisible();
  });

  test("localises the 404 page", async ({ page }) => {
    const response = await page.goto("/ar/work/does-not-exist");

    expect([200, 404]).toContain(response?.status());
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex",
    );
    await expect(
      page.getByRole("heading", { level: 1, name: "الصفحة غير موجودة" }),
    ).toBeVisible();
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens the sheet and navigates to a section", async ({ page }) => {
    await page.goto("/en");

    const trigger = page.getByRole("button", { name: "Open menu" });
    const sheet = page.getByRole("dialog");

    // Hydration can lag behind load under parallel workers, so retry the click
    // until the sheet actually opens instead of assuming the first one lands.
    await expect(async () => {
      if (!(await sheet.isVisible())) {
        await trigger.click();
      }
      await expect(sheet).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 15_000 });

    await expect(sheet.getByRole("link", { name: "Work" })).toBeVisible();

    await sheet.getByRole("link", { name: "Experience" }).click();

    await expect(sheet).toHaveCount(0);
    await expect(page).toHaveURL(/#experience$/);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);
  });
});
