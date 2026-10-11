import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForGetCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogGetCalendarEntry';

export class FakeGetCalendarEntryLoggerRepo implements LogRepository<LogDataForGetCalendarEntry> {
	save(logDTO: LogForSave<LogDataForGetCalendarEntry>): Promise<void> {
		return Promise.resolve();
	}
}
