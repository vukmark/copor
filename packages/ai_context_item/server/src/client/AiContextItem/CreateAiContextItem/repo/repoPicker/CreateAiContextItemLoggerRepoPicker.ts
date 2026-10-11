import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/logger/LogCreateAiContextItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateAiContextItemLoggerRepo
} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/repo/fake/FakeCreateAiContextItemLoggerRepo';
import {
	KyselyCreateAiContextItemLoggerRepo
} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/repo/kysely/KyselyCreateAiContextItemLoggerRepo';

export class CreateAiContextItemLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateAiContextItem>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForCreateAiContextItem>> {
		return {
			[DBEnv.FAKE]: FakeCreateAiContextItemLoggerRepo,
			[DBEnv.KYSELY]: KyselyCreateAiContextItemLoggerRepo
		};
	}
}