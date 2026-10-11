import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForGetCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogGetCalendarEntry';
import {
	FakeGetCalendarEntryLoggerRepo
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/repo/fake/FakeGetCalendarEntryLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetCalendarEntryLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForGetCalendarEntry>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForGetCalendarEntry>> {
		return {
			[DBEnv.FAKE]: FakeGetCalendarEntryLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository<LogDataForGetCalendarEntry>
		};
	}
}
