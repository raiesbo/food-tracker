import getDateWeek from "./getDateWeek";
import { describe, test, expect } from "vitest";

describe('getDateWeek', () => {
	test('returns the correct week number', () => {
		expect(getDateWeek(new Date('05/10/2023'))).toBe(19);
		expect(getDateWeek(new Date('05/15/2023'))).toBe(20);
	});
});
