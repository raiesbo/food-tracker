import formatDate from './formatDate';

jest.useFakeTimers().setSystemTime(new Date('2023-04-28'));

describe('formatDate', () => {
	it('returns the correct date for today', () => {
		const date = new Date();
		const laterToday = date.setHours(date.getHours() - 3);
		expect(formatDate(laterToday)).toBe('heute 21:00');
	});

	it('returns the correct date for yesterday', () => {
		const date = new Date();
		const tomorrow = date.setHours(date.getHours() - 28);
		expect(formatDate(tomorrow)).toBe('gestern 20:00');
	});

	it('returns the correct date for more than one day of difference', () => {
		const date = new Date();
		const tomorrow = date.setDate(date.getDate() - 3);
		expect(formatDate(tomorrow)).toBe('25.04.2023, 00:00');
	});
});
