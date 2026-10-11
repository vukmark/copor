import {
	ValidateIsCalendarEntryOverlappingDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateIsCalendarEntryOverlapping';

export interface IsCalendarEntryOverlappingRepo {
	isCalendarEntryOverlapping(input: ValidateIsCalendarEntryOverlappingDTO | undefined): Promise<boolean>;
}
