import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

export class LogCreateCalendarEntry extends TypedLogger<LogDataForCreateCalendarEntry> {
	public getType(): string {
		return 'createCalendarEntry';
	}
}

export interface LogDataForCreateCalendarEntry {
	id: string;
	userId: string;
	type: CalendarEntryType;
	startDate: Date;
	endDate: Date;
}
