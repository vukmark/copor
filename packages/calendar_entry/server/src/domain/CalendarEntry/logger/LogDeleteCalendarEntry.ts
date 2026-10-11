import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteCalendarEntry extends TypedLogger<LogDataForDeleteCalendarEntry> {
	public getType(): string {
		return 'deleteCalendarEntry';
	}
}

export interface LogDataForDeleteCalendarEntry {
	id: string;
}
