import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeleteCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogDeleteCalendarEntry';

export class FakeDeleteCalendarEntryLoggerRepo implements LogRepository<LogDataForDeleteCalendarEntry> {
	save(logDTO: LogForSave<LogDataForDeleteCalendarEntry>): Promise<void> {
		return Promise.resolve();
	}
}
