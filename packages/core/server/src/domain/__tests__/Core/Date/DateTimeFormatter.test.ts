import {DateTimeFormat} from '@copor/core/domain/Core/Date/DateTimeFormat';

describe('Date Time Formatter', () => {
	it('get date time formatted de date', () => {
		const dateTimeDate = new DateTimeFormat(new Date('2022-12-20'), 'de');

		expect(dateTimeDate.format()).toEqual('20.12.2022, 01:00:00');
	});
	it('get date time formatted en date', () => {
		const dateTimeFormat = new DateTimeFormat(new Date('2022-06-06'), 'en');

		expect(dateTimeFormat.format()).toEqual('06/06/2022, 02:00:00 AM');
	});
});
