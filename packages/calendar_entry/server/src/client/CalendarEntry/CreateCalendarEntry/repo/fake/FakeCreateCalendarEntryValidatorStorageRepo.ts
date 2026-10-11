import {
	ValidateCreateCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateCreateCalendarEntryRepo';
import {
	ValidateIsCalendarEntryOverlappingDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateIsCalendarEntryOverlapping';

export class FakeCreateCalendarEntryValidatorStorageRepo implements ValidateCreateCalendarEntryRepo {
	isNotValidUser(id: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

	isCalendarEntryOverlapping(input: ValidateIsCalendarEntryOverlappingDTO | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
