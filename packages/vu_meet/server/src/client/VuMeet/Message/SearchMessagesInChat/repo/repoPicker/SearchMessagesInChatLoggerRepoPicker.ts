import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSearchMessagesInChatLoggerRepo} from '../fake/FakeSearchMessagesInChatLoggerRepo';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForSearchMessagesInChat}
	from '@copor/vu_meet/domain/VuMeet/Message/logger/LogSearchMessagesInChat';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class SearchMessagesInChatLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForSearchMessagesInChat>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForSearchMessagesInChat>> {
		return {
			[DBEnv.FAKE]: FakeSearchMessagesInChatLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
