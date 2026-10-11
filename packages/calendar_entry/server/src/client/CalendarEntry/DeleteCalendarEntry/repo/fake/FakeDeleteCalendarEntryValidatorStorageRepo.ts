import {
	ValidateDeleteCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateDeleteCalendarEntryRepo';

export class FakeDeleteCalendarEntryValidatorStorageRepo implements ValidateDeleteCalendarEntryRepo {
	isInvalidCalendarEntry(calendarEntryId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
