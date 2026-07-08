import { test, expect } from "@playwright/test";

test("search, category filter, and official-only toggle all work", async ({ page }) => {
  await page.goto("/");

  const cards = page.locator(".server-card");
  await expect(cards).toHaveCount(18);

  // Text search
  await page.getByLabel("Search servers").fill("supabase");
  await expect(page.locator(".server-card:visible")).toHaveCount(1);
  await expect(page.getByText("Showing 1 of 18 entries")).toBeVisible();
  await page.getByLabel("Search servers").fill("");

  // Category filter
  await page.getByLabel("Filter by category").selectOption("design");
  const designCount = await page.locator(".server-card:visible").count();
  expect(designCount).toBeGreaterThan(0);
  expect(designCount).toBeLessThan(18);
  await page.getByLabel("Filter by category").selectOption("all");

  // Official-only toggle
  await page.getByLabel("Filter by official status").selectOption("community");
  const communityCards = page.locator(".server-card:visible");
  const communityCount = await communityCards.count();
  expect(communityCount).toBeGreaterThan(0);
  await expect(communityCards.first()).toContainText("COMMUNITY");

  // No-results empty state
  await page.getByLabel("Filter by official status").selectOption("all");
  await page.getByLabel("Search servers").fill("zzz-nonexistent-server-zzz");
  await expect(page.locator(".server-card:visible")).toHaveCount(0);
  await expect(page.getByText("No servers match that search")).toBeVisible();
});

test("detail page link and back navigation work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View details →" }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Back to all servers" }).click();
  await expect(page).toHaveURL("/");
});
