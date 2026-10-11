import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

export interface ValidateCreateCalendarEntryDTO {
	actorId: string;
	userId: string;
	type: CalendarEntryType;
	startDate: Date;
	endDate: Date;
}
