import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForDeleteCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogDeleteCalendarEntry';
import {
	FakeDeleteCalendarEntryLoggerRepo
} from '@copor/calendar_entry/client/CalendarEntry/DeleteCalendarEntry/repo/fake/FakeDeleteCalendarEntryLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteCalendarEntryLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteCalendarEntry>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForDeleteCalendarEntry>> {
		return {
			[DBEnv.FAKE]: FakeDeleteCalendarEntryLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository<LogDataForDeleteCalendarEntry>
		};
	}
}
