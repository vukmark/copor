import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetAlarmLoggerRepo} from '../fake/FakeGetAlarmLoggerRepo';
import {LogDataForGetAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogGetAlarm';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetAlarmLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetAlarm>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetAlarm>> {
		return {
			[DBEnv.KYSELY]: FakeGetAlarmLoggerRepo,
			[DBEnv.FAKE]: KyselyLogRepository
		};
	}
}
