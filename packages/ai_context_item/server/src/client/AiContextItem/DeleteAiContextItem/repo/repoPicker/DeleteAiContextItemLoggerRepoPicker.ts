import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/logger/LogDeleteAiContextItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteAiContextItemLoggerRepo
} from '@copor/ai_context_item/client/AiContextItem/DeleteAiContextItem/repo/fake/FakeDeleteAiContextItemLoggerRepo';
import {
	KyselyDeleteAiContextItemLoggerRepo
} from '@copor/ai_context_item/client/AiContextItem/DeleteAiContextItem/repo/kysely/KyselyDeleteAiContextItemLoggerRepo';

export class DeleteAiContextItemLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteAiContextItem>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForDeleteAiContextItem>> {
		return {
			[DBEnv.FAKE]: FakeDeleteAiContextItemLoggerRepo,
			[DBEnv.KYSELY]: KyselyDeleteAiContextItemLoggerRepo
		};
	}
}