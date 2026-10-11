import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

jest.unmock('../../../../Core/global/SimpleDateAndTime/interactor/CurrentUTCDate');

describe('CurrentUTCDate', () => {
	let currentUTCDate: CurrentUTCDate;

	beforeEach(() => {
		currentUTCDate = new CurrentUTCDate();
	});

	it('should return a Date object representing the current UTC date and time', () => {
		const currentDateInUTC = new Date();

		const expectedYear = currentDateInUTC.getUTCFullYear();
		const expectedMonth = currentDateInUTC.getUTCMonth();
		const expectedDate = currentDateInUTC.getUTCDate();
		const expectedHours = currentDateInUTC.getUTCHours();
		const expectedMinutes = currentDateInUTC.getUTCMinutes();
		const expectedSeconds = currentDateInUTC.getUTCSeconds();

		const currentUTCDateValue = currentUTCDate.getCurrentUTCDate();

		expect(currentUTCDateValue.getUTCFullYear()).toBe(expectedYear);
		expect(currentUTCDateValue.getUTCMonth()).toBe(expectedMonth);
		expect(currentUTCDateValue.getUTCDate()).toBe(expectedDate);
		expect(currentUTCDateValue.getUTCHours()).toBe(expectedHours);
		expect(currentUTCDateValue.getUTCMinutes()).toBe(expectedMinutes);
		expect(currentUTCDateValue.getUTCSeconds()).toBe(expectedSeconds);
	});
});