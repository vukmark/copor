import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeMarkChatMessagesSeenLoggerRepo} from '../fake/FakeMarkChatMessagesSeenLoggerRepo';
import {LogDataForMarkChatMessagesSeen} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogMarkChatMessagesSeen';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class MarkChatMessagesSeenLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForMarkChatMessagesSeen>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForMarkChatMessagesSeen>> {
		return {
			[DBEnv.FAKE]: FakeMarkChatMessagesSeenLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
