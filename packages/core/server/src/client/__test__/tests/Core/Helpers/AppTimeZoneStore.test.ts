import {AppTimeZoneStore} from '../../../../Core/Helpers/AppTimeZoneStore';

describe('AppTimeZoneStore', () => {
	afterEach(() => {
		AppTimeZoneStore.set('Europe/Berlin');
	});

	it('defaults to Europe/Berlin', () => {
		expect(AppTimeZoneStore.get()).toEqual('Europe/Berlin');
	});

	it('reflects the most recently set time zone', () => {
		AppTimeZoneStore.set('America/New_York');

		expect(AppTimeZoneStore.get()).toEqual('America/New_York');
	});
});
