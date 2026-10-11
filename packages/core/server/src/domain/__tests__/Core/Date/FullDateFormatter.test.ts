import {FullDateFormat} from '@copor/core/domain/Core/Date/FullDateFormat';

describe('Full Date Formatter', () => {
	it('get simple formatted de date', () => {
		const simpleDate = new FullDateFormat(new Date('2022-12-20'), 'de');

		expect(simpleDate.format()).toEqual('Dienstag, 20. Dezember 2022');
	});
	it('get formatted en date', () => {
		const simpleDate = new FullDateFormat(new Date('2022-06-06'), 'en');

		expect(simpleDate.format()).toEqual('Monday, June 06, 2022');
	});
});