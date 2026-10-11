import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

export class LogUpdateCalendarEntry extends TypedLogger<LogDataForUpdateCalendarEntry> {
	public getType(): string {
		return 'updateCalendarEntry';
	}
}

export interface LogDataForUpdateCalendarEntry {
	id: string;
	userId: string;
	type: CalendarEntryType;
	startDate: Date;
	endDate: Date;
}
