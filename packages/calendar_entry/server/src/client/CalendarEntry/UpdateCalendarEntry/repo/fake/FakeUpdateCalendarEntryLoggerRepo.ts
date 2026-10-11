import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogUpdateCalendarEntry';

export class FakeUpdateCalendarEntryLoggerRepo implements LogRepository<LogDataForUpdateCalendarEntry> {
	save(logDTO: LogForSave<LogDataForUpdateCalendarEntry>): Promise<void> {
		return Promise.resolve();
	}
}
