import {SimpleDateFormat} from '@copor/core/domain/Core/Date/SimpleDateFormat';


describe('Simple Date Formatter', () => {
	it('get simple formatted de date', () => {
		const simpleDate = new SimpleDateFormat(new Date('2022-12-20'), 'de');

		expect(simpleDate.format()).toEqual('20.12.2022');
	});
	it('get simple formatted en date', () => {
		const simpleDate = new SimpleDateFormat(new Date('2022-06-06'), 'en');

		expect(simpleDate.format()).toEqual('06/06/2022');
	});
});
