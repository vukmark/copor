import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/logger/LogUpdateAiContextItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {
	FakeUpdateAiContextItemLoggerRepo
} from '@copor/ai_context_item/client/AiContextItem/UpdateContextItem/repo/fake/FakeUpdateAiContextItemLoggerRepo';

export class UpdateAiContextItemLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateAiContextItem>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateAiContextItem>> {
		return {
			[DBEnv.FAKE]: FakeUpdateAiContextItemLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}