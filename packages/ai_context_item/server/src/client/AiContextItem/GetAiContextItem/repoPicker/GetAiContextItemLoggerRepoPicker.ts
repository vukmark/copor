import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/logger/LogGetAiContextItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyGetAiContextItemLoggerRepo
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/kysely/KyselyGetAiContextItemLoggerRepo';
import {
	FakeGetAiContextItemLoggerRepo
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/fake/FakeGetAiContextItemLoggerRepo';

export class GetAiContextItemLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForGetAiContextItem>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetAiContextItem>> {
		return {
			[DBEnv.KYSELY]: KyselyGetAiContextItemLoggerRepo,
			[DBEnv.FAKE]: FakeGetAiContextItemLoggerRepo
		};
	}
}