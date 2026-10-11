import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteChecklistItemLoggerRepo
} from '@copor/checklist/client/ChecklistItem/DeleteChecklistItem/repo/fake/FakeDeleteChecklistItemLoggerRepo';
import {LogDataForDeleteChecklistItem} from '@copor/checklist/domain/ChecklistItem/logger/LogDeleteChecklistItem';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteChecklistItemLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteChecklistItem>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForDeleteChecklistItem>> {
		return {
			[DBEnv.FAKE]: FakeDeleteChecklistItemLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
