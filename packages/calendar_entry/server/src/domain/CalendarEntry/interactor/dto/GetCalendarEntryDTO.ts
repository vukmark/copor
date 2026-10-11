import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

export interface GetCalendarEntryDTO {
	id: string;
	userId: string;
	type: CalendarEntryType;
	startDate: Date;
	endDate: Date;
	description: string | null;
	createdBy: string;
	createdAt: Date;
	modifiedBy: string;
	modifiedAt: Date;
	creatorFirstName: string;
	creatorLastName: string;
}
