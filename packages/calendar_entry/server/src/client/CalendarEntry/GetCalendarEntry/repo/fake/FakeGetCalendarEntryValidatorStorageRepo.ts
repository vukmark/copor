import {ValidateGetCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateGetCalendarEntryRepo';

export class FakeGetCalendarEntryValidatorStorageRepo implements ValidateGetCalendarEntryRepo {
	isInvalidCalendarEntry(calendarEntryId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
