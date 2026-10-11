import {DateRange} from '@copor/core/domain/Core/global/DateRange/DateRange';
import {SimpleDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleDate';
import {InvalidDateRangeException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidDateRangeException';

describe('DateRange Entity Test', () => {
	it('throw error if invalid date range', () => {
		expect(() => new DateRange(new SimpleDate(13, 5, 2024), new SimpleDate(11, 5, 2024))).toThrow(InvalidDateRangeException);
	});

	it('get start date', () => {
		const startDate: SimpleDate = new SimpleDate(1, 2, 2024);
		const endDate: SimpleDate = new SimpleDate(10, 2, 2024);
		const dateRange = new DateRange(startDate, endDate);

		expect(dateRange.getStartDate()).toEqual(startDate);
	});
	it('get end date', () => {
		const startDate: SimpleDate = new SimpleDate(1, 2, 2024);
		const endDate: SimpleDate = new SimpleDate(10, 2, 2024);
		const dateRange = new DateRange(startDate, endDate);

		expect(dateRange.getEndDate()).toEqual(endDate);
	});
});
