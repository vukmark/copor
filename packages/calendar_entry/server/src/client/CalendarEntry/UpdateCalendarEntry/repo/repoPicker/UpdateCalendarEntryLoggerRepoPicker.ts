import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForUpdateCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogUpdateCalendarEntry';
import {
	FakeUpdateCalendarEntryLoggerRepo
} from '@copor/calendar_entry/client/CalendarEntry/UpdateCalendarEntry/repo/fake/FakeUpdateCalendarEntryLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateCalendarEntryLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateCalendarEntry>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForUpdateCalendarEntry>> {
		return {
			[DBEnv.FAKE]: FakeUpdateCalendarEntryLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository<LogDataForUpdateCalendarEntry>
		};
	}
}
