import {CalendarEntryKyselyHelper} from '@copor/calendar_entry/client/CalendarEntry/repositoryHelper/CalendarEntryKyselyHelper';
import {
	ValidateUpdateCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateUpdateCalendarEntryRepo';
import {
	ValidateIsCalendarEntryOverlappingDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateIsCalendarEntryOverlapping';

export class KyselyUpdateCalendarEntryValidatorStorageRepo implements ValidateUpdateCalendarEntryRepo {
	isInvalidCalendarEntry(calendarEntryId: string | undefined): Promise<boolean> {
		return CalendarEntryKyselyHelper.isInvalidCalendarEntry(calendarEntryId);
	}

	isCalendarEntryOverlapping(input: ValidateIsCalendarEntryOverlappingDTO | undefined): Promise<boolean> {
		return CalendarEntryKyselyHelper.isCalendarEntryOverlapping(input);
	}
}
