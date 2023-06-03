import formatDateAndTime from './formatDateAndTime';
import { expect, test, describe, beforeEach, vi } from "vitest";

describe('formatDateAndTime', () => {
	beforeEach(() => {
		vi.setSystemTime(new Date('2023-04-28'));
	});

	test('returns the correct date for today', () => {
		const date = new Date();
		date.setHours(14);
		expect(formatDateAndTime(date)).toBe('in 14 hours');
	});

	test('returns the correct date for yesterday', () => {
		const date = new Date();
		const tomorrow = date.setHours(date.getHours() - 14);
		expect(formatDateAndTime(tomorrow)).toBe('14 hours ago');
	});

	test('returns the correct date for more than one day of difference', () => {
		const date = new Date();
		const tomorrow = date.setDate(date.getDate() - 3);
		expect(formatDateAndTime(tomorrow)).toBe('25.04.23, 00:00');
	});
});
