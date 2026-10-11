import {
	ValidateUpdateCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateUpdateCalendarEntryRepo';
import {
	ValidateIsCalendarEntryOverlappingDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateIsCalendarEntryOverlapping';

export class FakeUpdateCalendarEntryValidatorStorageRepo implements ValidateUpdateCalendarEntryRepo {
	isInvalidCalendarEntry(calendarEntryId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

	isNotValidUser(id: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

	isCalendarEntryOverlapping(input: ValidateIsCalendarEntryOverlappingDTO | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
