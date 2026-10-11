import {
	SimpleDate,
	SimpleDateInvalidDayException,
	SimpleDateInvalidMonthException, SimpleDateInvalidYearException
} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleDate';

describe('Testing simple date', () => {
	it('Test if SimpleDateDeprecated class exists', () => {
		const date = new SimpleDate(27, 12, 1978);

		expect(typeof date).toBe(typeof new SimpleDate(1, 1, 1));
	});

	it('Test if constructor constructs', () => {
		const date = new SimpleDate(27, 12, 1978);

		expect(typeof date).toBe(typeof new SimpleDate(1, 1, 1));
	});
	it('Should return date, month and year for the date constructed', () => {
		const date = new SimpleDate(27, 12, 1978);

		expect(date.getDay()).toBe(27);
		expect(date.getMonth()).toBe(12);
		expect(date.getYear()).toBe(1978);
	});

	it('Should throw exception for invalid day', () => {
		expect(() => new SimpleDate(0, 1, 2023)).toThrow(SimpleDateInvalidDayException);
		expect(() => new SimpleDate(32, 1, 2023)).toThrow(SimpleDateInvalidDayException);
		expect(() => new SimpleDate(29, 2, 2023)).toThrow(SimpleDateInvalidDayException);
		expect(() => new SimpleDate(30, 2, 2024)).toThrow(SimpleDateInvalidDayException);
	});

	it('Should throw exception for invalid month', () => {
		expect(() => new SimpleDate(29, 0, 2023)).toThrow(SimpleDateInvalidMonthException);
		expect(() => new SimpleDate(29, 14, 2023)).toThrow(SimpleDateInvalidMonthException);
	});

	it('Should throw exception for invalid year', () => {
		expect(() => new SimpleDate(29, 1, 0)).toThrow(SimpleDateInvalidYearException);
	});

	it('Should compare two dates and return true if the tested date is after base date', () => {
		const baseDate = new SimpleDate(15, 3, 2024);

		const testDate1 = new SimpleDate(15, 3, 2024);
		const testDate2 = new SimpleDate(15, 3, 2025);
		const testDate3 = new SimpleDate(15, 3, 2023);
		const testDate4 = new SimpleDate(15, 4, 2024);
		const testDate5 = new SimpleDate(15, 2, 2024);
		const testDate6 = new SimpleDate(16, 3, 2024);
		const testDate7 = new SimpleDate(14, 3, 2024);

		expect(baseDate.isAfter(testDate1)).toBe(false);
		expect(baseDate.isAfter(testDate2)).toBe(false);
		expect(baseDate.isAfter(testDate3)).toBe(true);
		expect(baseDate.isAfter(testDate4)).toBe(false);
		expect(baseDate.isAfter(testDate5)).toBe(true);
		expect(baseDate.isAfter(testDate6)).toBe(false);
		expect(baseDate.isAfter(testDate7)).toBe(true);
	});
});