import {CalendarEntryKyselyHelper} from '@copor/calendar_entry/client/CalendarEntry/repositoryHelper/CalendarEntryKyselyHelper';
import {
	ValidateCreateCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateCreateCalendarEntryRepo';
import {
	ValidateIsCalendarEntryOverlappingDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateIsCalendarEntryOverlapping';

export class KyselyCreateCalendarEntryValidatorStorageRepo implements ValidateCreateCalendarEntryRepo {
	isCalendarEntryOverlapping(input: ValidateIsCalendarEntryOverlappingDTO | undefined): Promise<boolean> {
		return CalendarEntryKyselyHelper.isCalendarEntryOverlapping(input);
	}
}
