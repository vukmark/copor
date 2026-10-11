import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateChecklistItemLoggerRepo
} from '@copor/checklist/client/ChecklistItem/CreateChecklistItem/repo/fake/FakeCreateChecklistItemLoggerRepo';
import {LogDataForCreateChecklistItem} from '@copor/checklist/domain/ChecklistItem/logger/LogCreateChecklistItem';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateChecklistItemLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateChecklistItem>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForCreateChecklistItem>> {
		return {
			[DBEnv.FAKE]: FakeCreateChecklistItemLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
