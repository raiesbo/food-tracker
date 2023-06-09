import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

// Header section
test.describe('header section', () => {
	test('has title', async ({ page }) => {
		await expect(page).toHaveTitle(/Food Tracker/);
	});

	test('renders a h1 header', async ({ page }) => {
		const header = await page.getByRole('heading', { name: 'Food Tracker' });
		await expect(header !== undefined).toBeTruthy();
	});

	test('renders the location drop down', async ({ page }) => {
		const locationDropdown = await page.locator('#location');
		await expect(locationDropdown !== undefined).toBeTruthy();
	});

	test('can update the Locations drop down', async ({ page }) => {
		const locationDropdown = await page.locator('#location');
		await expect(locationDropdown).toHaveText('All');
		await locationDropdown.click();

		await page.getByRole('option', { name: 'Berlin' }).click();
		await expect(locationDropdown).toHaveText('Berlin');
	});

	test('renders the Categories drop down', async ({ page }) => {
		const categoryDropdown = await page.locator('#category');
		await expect(categoryDropdown !== undefined).toBeTruthy();
	});

	test('can update the Categories drop down', async ({ page }) => {
		const categoryDropdown = await page.locator('#category');
		await expect(categoryDropdown).toHaveText('All');
		await categoryDropdown.click();

		await page.getByRole('option', { name: 'Spanish' }).click();
		await expect(categoryDropdown).toHaveText('Spanish');
	});

	test('search button redirects to food truck search page', async ({ page }) => {
		await page.getByRole('button', { name: 'Find Your Next Street Food' }).click();

		await page.waitForURL(/food-trucks/);
		await expect(page.url()).toContain('food-trucks');
	});
});
