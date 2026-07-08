import { test, expect } from '@playwright/test';

test('homepage renders the project name and purpose', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'MCP Atlas' })).toBeVisible();
  await expect(page.getByText('curated directory of real, verified MCP servers')).toBeVisible();
});
