import {toDate, toZonedTime, formatInTimeZone} from 'date-fns-tz';
import {parse, isValid, format} from 'date-fns';

const DATETIME_ISO_FORMAT = 'yyyy-MM-dd\'T\'HH:mm:ss';
const DEFAULT_TIME_ZONE = 'Europe/Berlin';

export abstract class TimeTransformer {
	protected get timeZone(): string {
		return TimeTransformer.timeZoneProvider();
	}

	static setTimeZoneProvider(provider: () => string): void {
		TimeTransformer.timeZoneProvider = provider;
	}

	/**
	 * `TimeTransformer` is subclassed directly (as a mixin-style base class) by
	 * dozens of Kysely repos across the codebase, so the configured time zone
	 * can't be constructor-injected without touching every one of them. Instead
	 * the client app registers a provider once at boot (see `AppTimeZoneStore`),
	 * and every instance reads through it — domain stays free of any direct
	 * dependency on client's settings store.
	 */
	private static timeZoneProvider: () => string = () => DEFAULT_TIME_ZONE;

	/**
	 * `date-fns-tz`'s `toDate` ignores its `timeZone` option when given a `Date`
	 * (it just clones the instant unchanged) — the option only takes effect for
	 * string input. So `localDate`'s wall-clock fields are read out via the
	 * host process's own local getters first, then re-parsed as a string against
	 * `this.timeZone` to get the correct UTC instant regardless of host time zone.
	 */
	toUtc(localDate: Date): Date {
		return toDate(format(localDate, DATETIME_ISO_FORMAT), {timeZone: this.timeZone});
	}

	fromUtc(utcDate: Date): Date {
		return toZonedTime(utcDate, this.timeZone);
	}

	stringToDateTime(dateString: string): Date {
		const parsed = parse(dateString, DATETIME_ISO_FORMAT, new Date());

		if (!isValid(parsed)) {
			throw new Error(`Invalid date string: "${dateString}". Expected format: ${DATETIME_ISO_FORMAT}`);
		}
		return toDate(dateString, {timeZone: this.timeZone});
	}

	dateTimeToString(date: Date): string {
		return formatInTimeZone(date, this.timeZone, DATETIME_ISO_FORMAT);
	}
}
