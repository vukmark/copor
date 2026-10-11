import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateAlarmLoggerRepo} from '@copor/todo/client/ToDo/Alarm/CreateAlarm/repo/fake/FakeCreateAlarmLoggerRepo';
import {LogDataForCreateAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogCreateAlarm';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateAlarmLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateAlarm>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForCreateAlarm>> {
		return {
			[DBEnv.FAKE]: FakeCreateAlarmLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
