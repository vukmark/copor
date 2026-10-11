import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForCreateCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogCreateCalendarEntry';
import {
	FakeCreateCalendarEntryLoggerRepo
} from '@copor/calendar_entry/client/CalendarEntry/CreateCalendarEntry/repo/fake/FakeCreateCalendarEntryLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateCalendarEntryLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateCalendarEntry>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForCreateCalendarEntry>> {
		return {
			[DBEnv.FAKE]: FakeCreateCalendarEntryLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository<LogDataForCreateCalendarEntry>
		};
	}
}
