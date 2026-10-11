import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetChatWithUserLoggerRepo} from '../fake/FakeGetChatWithUserLoggerRepo';
import {LogDataForGetChatWithUser}
	from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogGetChatWithUser';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetChatWithUserLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForGetChatWithUser>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForGetChatWithUser>> {
		return {
			[DBEnv.FAKE]: FakeGetChatWithUserLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
