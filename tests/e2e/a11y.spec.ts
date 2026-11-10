import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Reduced motion keeps the reveal wrapper from starting at opacity 0, which
// would otherwise make contrast checks meaningless.
test.use({ reducedMotion: "reduce" });

const routes = [
  { path: "/en", name: "home (en)" },
  { path: "/nl", name: "home (nl)" },
  { path: "/ar", name: "home (ar, rtl)" },
  { path: "/en/work", name: "work index" },
  { path: "/en/work/portfolio", name: "case study (en)" },
  { path: "/ar/work/nextjs-viator", name: "case study (ar, rtl)" },
];

for (const route of routes) {
  test(`has no WCAG A/AA violations on ${route.name}`, async ({ page }) => {
    await page.goto(route.path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const summary = results.violations.map(
      (violation) =>
        `${violation.id} (${violation.impact}): ${violation.help} — ${violation.nodes.length} node(s)`,
    );

    expect(summary).toEqual([]);
  });
}

test("contact form errors stay accessible", async ({ page }) => {
  await page.goto("/en");

  await page.locator("#contact-name").fill("A");
  await page.locator("#contact-email").fill("valid@example.com");
  await page.locator("#contact-message").fill("short");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(results.violations.map((v) => v.id)).toEqual([]);
});
