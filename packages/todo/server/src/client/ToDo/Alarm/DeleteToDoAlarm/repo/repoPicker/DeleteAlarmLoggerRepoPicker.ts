import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteAlarmLoggerRepo} from '@copor/todo/client/ToDo/Alarm/DeleteToDoAlarm/repo/fake/FakeDeleteAlarmLoggerRepo';
import {LogDataForDeleteAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogDeleteAlarm';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteAlarmLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteAlarm>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForDeleteAlarm>> {
		return {
			[DBEnv.FAKE]: FakeDeleteAlarmLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
