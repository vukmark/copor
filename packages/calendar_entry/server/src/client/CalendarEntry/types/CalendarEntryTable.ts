import {Generated} from '@copor/core/client/types/tables/Generated';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

export interface CalendarEntryTable {
	id: string;
	userId: string;
	type: CalendarEntryType;
	startDate: Date;
	endDate: Date;
	description: string | null;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
