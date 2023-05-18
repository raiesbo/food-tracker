import getDayOfWeek from "./getDayOfWeek";
import { describe, test, expect } from "vitest";

describe('getDayOfWeek', () => {
	test('returns the correct string', () => {
		expect(getDayOfWeek(new Date('05/10/2023'))).toBe('Wednesday');
		expect(getDayOfWeek(new Date('05/15/2023'))).toBe('Monday');
	});
});
