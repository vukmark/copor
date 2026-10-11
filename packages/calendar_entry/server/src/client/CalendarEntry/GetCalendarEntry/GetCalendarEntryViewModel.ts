import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

export interface GetCalendarEntryViewModel {
	id: string;
	userId: string;
	type: CalendarEntryType;
	startDate: string;
	endDate: string;
	description: string | null;
	createdBy: string;
	createdAt: Date;
	modifiedBy: string;
	modifiedAt: Date;
	creatorName: string;
}
