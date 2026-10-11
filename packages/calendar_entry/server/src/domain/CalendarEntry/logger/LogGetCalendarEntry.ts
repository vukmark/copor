import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetCalendarEntry extends TypedLogger<LogDataForGetCalendarEntry> {
	public getType(): string {
		return 'getCalendarEntry';
	}
}

export interface LogDataForGetCalendarEntry {
	id: string;
}
