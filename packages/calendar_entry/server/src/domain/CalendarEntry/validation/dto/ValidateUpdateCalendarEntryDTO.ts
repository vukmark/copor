import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

export interface ValidateUpdateCalendarEntryDTO {
	id: string;
	actorId: string;
	userId: string;
	type: CalendarEntryType;
	startDate: Date;
	endDate: Date;
}
