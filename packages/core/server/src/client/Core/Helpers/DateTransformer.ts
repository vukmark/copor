import {toDate, toZonedTime, formatInTimeZone} from 'date-fns-tz';
import {parse, isValid, format} from 'date-fns';
import {AppTimeZoneStore} from '@copor/core/client/Core/Helpers/AppTimeZoneStore';

const DATETIME_ISO_FORMAT = 'yyyy-MM-dd\'T\'HH:mm:ss';

/**
 * Converts ISO string (local time) from frontend to UTC Date for DB storage.
 */
export function stringToDateTime(dateString: string): Date {
	const parsed = parse(dateString, DATETIME_ISO_FORMAT, new Date());

	if (!isValid(parsed)) {
		throw new Error(`Invalid date string: "${dateString}". Expected format: ${DATETIME_ISO_FORMAT}`);
	}

	return toDate(dateString, {timeZone: AppTimeZoneStore.get()});
}

/**
 * Converts a local Date object to UTC Date for DB storage.
 *
 * `date-fns-tz`'s `toDate` ignores its `timeZone` option when given a `Date`
 * (it just clones the instant unchanged) — the option only takes effect for
 * string input. So `localDate`'s wall-clock fields are read out via the host
 * process's own local getters first, then re-parsed as a string against the
 * configured zone to get the correct UTC instant regardless of host time zone.
 */
export function toDbDate(localDate: Date): Date {
	return toDate(format(localDate, DATETIME_ISO_FORMAT), {timeZone: AppTimeZoneStore.get()});
}

/**
 * Converts a UTC Date from DB to a Date object in local time zone.
 */
export function fromDbDate(utcDate: Date): Date {
	return toZonedTime(utcDate, AppTimeZoneStore.get());
}

/**
 * Converts a Date object to ISO string in local time zone for frontend.
 */
export function dateTimeToString(date: Date): string {
	return formatInTimeZone(date, AppTimeZoneStore.get(), DATETIME_ISO_FORMAT);
}

/**
 * Converts a UTC Date (from DB) to a Date object in the local time zone.
 * The returned Date will reflect local time when using getters like getHours().
 */
export function utcToLocalDate(dateFromDb: Date): Date {
	return toZonedTime(dateFromDb, AppTimeZoneStore.get());
}

/**
 * Formats a local Date object into a string for frontend.
 * You can override the format if needed.
 */
export function localDateToIsoString(localDate: Date, formatStr: string = DATETIME_ISO_FORMAT): string {
	return formatInTimeZone(localDate, AppTimeZoneStore.get(), formatStr);
}