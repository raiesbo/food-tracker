import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/food-trucks');
});

test.describe('header', () => {
	test('renders a h1 header', async ({ page }) => {
		const header = await page.getByRole('heading', { name: 'Food Trucks' });
		await expect(header !== undefined).toBeTruthy();
	});

	test('contains breadcrumbs that redirect', async ({ page }) => {
		const breadcrumb = await page.getByRole('link', { name: 'Home' });
		await expect(breadcrumb !== undefined).toBeTruthy();
		await breadcrumb.click();

		await page.waitForTimeout(150);

		await expect(page.url()).not.toContain('food-trucks');
	});
});

test.describe('filters', () => {
	test('renders the filter header', async ({ page }) => {
		const filtersHeader = await page.getByRole('heading', { name: 'Filters' });
		await expect(filtersHeader !== undefined).toBeTruthy();
	});

	test('renders all three input filters', async ({ page }) => {
		await page.goto('/food-trucks?city=Berlin&category=Spanish');

		const textInputFilter = await page.getByLabel('Food Truck\'s name');
		await expect(textInputFilter !== undefined).toBeTruthy();

		const cityDropDownFilter = await page.locator('#location');
		await expect(cityDropDownFilter !== undefined).toBeTruthy();

		const foodTypeDropDownFilter = await page.locator('#category');
		await expect(foodTypeDropDownFilter !== undefined).toBeTruthy();
	});

	test('renders two toggles', async ({ page }) => {
		const veganToggle = await page.locator('label').filter({ hasText: 'with Vegan options' });
		await expect(veganToggle !== undefined).toBeTruthy();

		const creditCardToggle = await page.locator('label').filter({ hasText: 'accepts Credit Card' });
		await expect(creditCardToggle !== undefined).toBeTruthy();
	});
});
