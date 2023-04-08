import { expect, test } from '@playwright/test';

test('landing page has expected component', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Ordröj' })).toBeVisible();
});
