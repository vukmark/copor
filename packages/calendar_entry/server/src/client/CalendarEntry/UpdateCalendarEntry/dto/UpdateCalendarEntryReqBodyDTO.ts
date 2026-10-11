import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

export interface UpdateCalendarEntryReqBodyDTO {
	id: string;
	userId: string;
	type: CalendarEntryType;
	startDate: string;
	endDate: string;
	description: string | null;
}
