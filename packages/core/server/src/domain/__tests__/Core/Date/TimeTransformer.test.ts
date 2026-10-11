import {DefaultTimeTransformer} from '@copor/core/domain/Core/Date/DefaultTimeTransformer';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';

describe('TimeTransformer', () => {
	afterEach(() => {
		TimeTransformer.setTimeZoneProvider(() => 'Europe/Berlin');
	});

	it('converts a local date-time string to UTC using the configured time zone (winter, no DST)', () => {
		TimeTransformer.setTimeZoneProvider(() => 'Europe/Berlin');
		const transformer = new DefaultTimeTransformer();

		const utcDate = transformer.stringToDateTime('2026-01-15T12:00:00');

		expect(utcDate.toISOString()).toEqual('2026-01-15T11:00:00.000Z');
	});

	it('converts a local date-time string to UTC using the configured time zone (summer, DST active)', () => {
		TimeTransformer.setTimeZoneProvider(() => 'Europe/Berlin');
		const transformer = new DefaultTimeTransformer();

		const utcDate = transformer.stringToDateTime('2026-07-15T12:00:00');

		expect(utcDate.toISOString()).toEqual('2026-07-15T10:00:00.000Z');
	});

	it('is not hardcoded to Europe/Berlin — respects whatever time zone the provider currently returns', () => {
		const transformer = new DefaultTimeTransformer();

		TimeTransformer.setTimeZoneProvider(() => 'Europe/Berlin');
		const berlinUtc = transformer.stringToDateTime('2026-01-15T12:00:00');

		TimeTransformer.setTimeZoneProvider(() => 'America/New_York');
		const newYorkUtc = transformer.stringToDateTime('2026-01-15T12:00:00');

		expect(berlinUtc.toISOString()).not.toEqual(newYorkUtc.toISOString());
		expect(newYorkUtc.toISOString()).toEqual('2026-01-15T17:00:00.000Z');
	});

	it('round-trips a UTC date back to the same local date-time string', () => {
		TimeTransformer.setTimeZoneProvider(() => 'Europe/Berlin');
		const transformer = new DefaultTimeTransformer();

		const utcDate = transformer.stringToDateTime('2026-03-10T09:30:00');

		expect(transformer.dateTimeToString(utcDate)).toEqual('2026-03-10T09:30:00');
	});

	it('toUtc reinterprets a Date\'s wall-clock fields in the configured zone, independent of host time zone', () => {
		TimeTransformer.setTimeZoneProvider(() => 'America/New_York');
		const transformer = new DefaultTimeTransformer();

		// A Date whose local (host) getters read 2026-01-15 12:00:00 — however the
		// host machine happens to be configured — must convert the same way.
		const localDate = new Date(2026, 0, 15, 12, 0, 0);

		expect(transformer.toUtc(localDate).toISOString()).toEqual('2026-01-15T17:00:00.000Z');
	});
});
