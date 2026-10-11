import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetCalendarEntryList extends NoDataLogger {
	public getType(): string {
		return 'getCalendarEntryList';
	}
}
