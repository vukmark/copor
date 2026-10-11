import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetMessageListLoggerRepo} from '../fake/FakeGetMessageListLoggerRepo';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetMessageList}
	from '@copor/vu_meet/domain/VuMeet/Message/logger/LogGetMessageList';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetMessageListLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForGetMessageList>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForGetMessageList>> {
		return {
			[DBEnv.FAKE]: FakeGetMessageListLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
