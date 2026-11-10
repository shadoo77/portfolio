import { expect, test } from "@playwright/test";

test.describe("contact form", () => {
  test("shows field errors for an invalid submission", async ({ page }) => {
    await page.goto("/en");

    await page.locator("#contact-name").fill("A");
    await page.locator("#contact-email").fill("valid@example.com");
    await page.locator("#contact-message").fill("short");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(
      page.getByText("Please write at least 10 characters."),
    ).toBeVisible();
    await expect(page.locator("#contact-name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.locator("#contact-name")).toHaveAttribute(
      "aria-describedby",
      "contact-name-error",
    );
  });

  test("hands off to the mail client when no provider is configured", async ({
    page,
  }) => {
    await page.goto("/en");

    await page.locator("#contact-name").fill("Playwright");
    await page.locator("#contact-email").fill("playwright@example.com");
    await page
      .locator("#contact-message")
      .fill("Automated verification of the contact handoff panel.");
    await page.getByRole("button", { name: "Send message" }).click();

    const panel = page.locator("#contact [role=status]");
    await expect(panel).toBeVisible();
    await expect(panel).toContainText("Finish in your email app");
    await expect(
      panel.getByRole("link", { name: /Open email app/ }),
    ).toHaveAttribute("href", /^mailto:shadi\.omar077@gmail\.com\?subject=/);
    await expect(page.locator("#contact form")).toHaveCount(0);
  });

  test("accepts a honeypot submission silently", async ({ page }) => {
    await page.goto("/en");

    await page.locator("#contact-name").fill("Spam Bot");
    await page.locator("#contact-email").fill("bot@example.com");
    await page
      .locator("#contact-message")
      .fill("Buy cheap backlinks right now, many links, very cheap.");
    await page.locator("#contact-website").evaluate((element, value) => {
      (element as HTMLInputElement).value = value;
    }, "https://spam.example");

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.locator("#contact [role=status]")).toContainText(
      "Message sent",
    );
  });

  test("is keyboard reachable", async ({ page }) => {
    await page.goto("/en");

    await page.locator("#contact-name").focus();
    await page.keyboard.press("Tab");

    await expect(page.locator("#contact-email")).toBeFocused();
  });
});
