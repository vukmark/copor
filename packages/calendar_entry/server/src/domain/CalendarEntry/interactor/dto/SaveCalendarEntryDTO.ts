import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

export interface SaveCalendarEntryDTO {
	id: string;
	userId: string;
	type: CalendarEntryType;
	startDate: Date;
	endDate: Date;
	description: string | null;
	actorId: string;
}
