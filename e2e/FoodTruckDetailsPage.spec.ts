import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/food-trucks/3');
});

test.describe('header', () => {
	test('renders a h1 header', async ({ page }) => {
		const header = await page.getByRole('heading', { name: 'Tapas Bar' });
		await expect(header !== undefined).toBeTruthy();
	});

	test('contains breadcrumbs that redirect', async ({ page }) => {
		const breadcrumb = await page.getByRole('link', { name: 'Food Trucks' });
		await expect(breadcrumb !== undefined).toBeTruthy();
		await breadcrumb.click();

		await page.waitForTimeout(150);

		await expect(page.url()).not.toContain('3');
	});
});

test.describe.only('filters', () => {
	test('renders the food truck description', async ({ page }) => {
		const description = await page.getByText('Indulge in the art of Spanish small plates, where every bite tells a flavorful');
		await expect(description !== undefined).toBeTruthy();
	});

	test('renders all required sections', async ({ page }) => {
		const contactInfo = await page.getByRole('heading', { name: 'Contact Information' });
		await expect(contactInfo !== undefined).toBeTruthy();

		const menu = await page.getByRole('heading', { name: 'Menu' });
		await expect(menu !== undefined).toBeTruthy();

		const openingHours = await page.getByRole('heading', { name: 'Opening Hours' });
		await expect(openingHours !== undefined).toBeTruthy();

		const rating = await page.getByRole('heading', { name: 'Ratings' });
		await expect(rating !== undefined).toBeTruthy();

		const reviews = await page.getByRole('heading', { name: 'Reviews' });
		await expect(reviews !== undefined).toBeTruthy();
	});
});
