import {
	SimpleTime,
	SimpleTimeInvalidHoursException,
	SimpleTimeInvalidMinutesException
} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleTime';

describe('Testing SimpleTime', () => {
	let simpleTime: SimpleTime;

	beforeEach(() => {
		simpleTime = new SimpleTime(16, 15);
	});
	it('Should correctly return the hours and minutes', () => {
		expect(simpleTime.getHours()).toBe(16);
		expect(simpleTime.getMinutes()).toBe(15);
	});

	it('Should throw an error for invalid hours', () => {
		expect(() => new SimpleTime(-1, 3)).toThrow(SimpleTimeInvalidHoursException);
		expect(() => new SimpleTime(24, 3)).toThrow(SimpleTimeInvalidHoursException);
	});

	it('Should throw an error for invalid minutes', () => {
		expect(() => new SimpleTime(1, -1)).toThrow(SimpleTimeInvalidMinutesException);
		expect(() => new SimpleTime(1, 63)).toThrow(SimpleTimeInvalidMinutesException);
	});
	describe('Is greather tests', () => {
		it('Should return true for time with lesser hours', () => {
			expect(simpleTime.isLaterThan(new SimpleTime(12, 0))).toEqual(true);
		});
		it('Should return false for time with more hours', () => {
			expect(simpleTime.isLaterThan(new SimpleTime(18, 0))).toEqual(false);
		});
		it('Should return true for time with same hours and lesser minutes', () => {
			expect(simpleTime.isLaterThan(new SimpleTime(16, 10))).toEqual(true);
		});
		it('Should return false for time with same hours and more minutes', () => {
			expect(simpleTime.isLaterThan(new SimpleTime(16, 45))).toEqual(false);
		});
	});
});
