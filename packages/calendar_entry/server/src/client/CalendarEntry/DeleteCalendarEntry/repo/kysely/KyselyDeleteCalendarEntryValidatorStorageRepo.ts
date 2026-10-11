import {CalendarEntryKyselyHelper} from '@copor/calendar_entry/client/CalendarEntry/repositoryHelper/CalendarEntryKyselyHelper';
import {
	ValidateDeleteCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateDeleteCalendarEntryRepo';

export class KyselyDeleteCalendarEntryValidatorStorageRepo implements ValidateDeleteCalendarEntryRepo {
	isInvalidCalendarEntry(calendarEntryId: string | undefined): Promise<boolean> {
		return CalendarEntryKyselyHelper.isInvalidCalendarEntry(calendarEntryId);
	}
}
