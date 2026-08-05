import { test, expect } from '@playwright/test';

test('homepage renders the project name and purpose', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'MCP Atlas', level: 1 })).toBeVisible();
  await expect(
    page.getByText('curated directory of real, verified Model Context Protocol servers'),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Submit a server' })).toHaveAttribute(
    'href',
    'https://github.com/effinrich/mcp-atlas/issues/new',
  );
});
