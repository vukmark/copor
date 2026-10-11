import {AppTimeZoneStore} from '../../../../Core/Helpers/AppTimeZoneStore';
import {stringToDateTime} from '../../../../Core/Helpers/DateTransformer';

describe('DateTransformer', () => {
	afterEach(() => {
		AppTimeZoneStore.set('Europe/Berlin');
	});

	it('converts using the time zone currently held by AppTimeZoneStore', () => {
		AppTimeZoneStore.set('Europe/Berlin');
		const berlinUtc = stringToDateTime('2026-01-15T12:00:00');

		AppTimeZoneStore.set('America/New_York');
		const newYorkUtc = stringToDateTime('2026-01-15T12:00:00');

		expect(berlinUtc.toISOString()).toEqual('2026-01-15T11:00:00.000Z');
		expect(newYorkUtc.toISOString()).toEqual('2026-01-15T17:00:00.000Z');
	});
});
