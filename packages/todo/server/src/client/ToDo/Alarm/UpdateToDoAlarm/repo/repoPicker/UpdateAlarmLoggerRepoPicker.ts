import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateAlarmLoggerRepo} from '../fake/FakeUpdateAlarmLoggerRepo';
import {LogDataForUpdateAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogUpdateAlarm';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateAlarmLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateAlarm>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateAlarm>> {
		return {
			[DBEnv.FAKE]: FakeUpdateAlarmLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
