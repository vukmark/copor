import {CalendarEntryKyselyHelper} from '@copor/calendar_entry/client/CalendarEntry/repositoryHelper/CalendarEntryKyselyHelper';
import {ValidateGetCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateGetCalendarEntryRepo';

export class KyselyGetCalendarEntryValidatorStorageRepo implements ValidateGetCalendarEntryRepo {
	isInvalidCalendarEntry(calendarEntryId: string | undefined): Promise<boolean> {
		return CalendarEntryKyselyHelper.isInvalidCalendarEntry(calendarEntryId);
	}
}
