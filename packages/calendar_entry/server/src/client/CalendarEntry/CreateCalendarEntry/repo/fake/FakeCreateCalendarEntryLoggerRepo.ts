import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForCreateCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogCreateCalendarEntry';

export class FakeCreateCalendarEntryLoggerRepo implements LogRepository<LogDataForCreateCalendarEntry> {
	save(logDTO: LogForSave<LogDataForCreateCalendarEntry>): Promise<void> {
		return Promise.resolve();
	}
}
