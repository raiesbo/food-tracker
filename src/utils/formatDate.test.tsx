import formatDate from './formatDate';
import { expect, test, describe, beforeEach, vi } from "vitest";

describe('formatDate', () => {
	beforeEach(() => {
		vi.setSystemTime(new Date('2023-04-28'));
	});

	test('returns the correct date for today', () => {
		const date = new Date();
		date.setHours(14);
		expect(formatDate(date)).toBe('Today 14:00');
	});

	test('returns the correct date for yesterday', () => {
		const date = new Date();
		const tomorrow = date.setHours(date.getHours() - 14);
		expect(formatDate(tomorrow)).toBe('Yesterday 10:00');
	});

	test('returns the correct date for more than one day of difference', () => {
		const date = new Date();
		const tomorrow = date.setDate(date.getDate() - 3);
		expect(formatDate(tomorrow)).toBe('25.04.2023, 00:00');
	});
});
