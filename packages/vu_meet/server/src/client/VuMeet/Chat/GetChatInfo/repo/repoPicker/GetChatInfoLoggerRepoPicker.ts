import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetChatInfoLoggerRepo} from '../fake/FakeGetChatInfoLoggerRepo';
import {LogDataForGetChatInfo} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogGetChatInfo';

export class GetChatInfoLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetChatInfo>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetChatInfo>> {
		return {
			[DBEnv.KYSELY]: FakeGetChatInfoLoggerRepo,
			[DBEnv.FAKE]: FakeGetChatInfoLoggerRepo
		};
	}
}
