import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForDeleteChecklist} from '@copor/checklist/domain/Checklist/logger/LogDeleteChecklist';
import {FakeDeleteChecklistLoggerRepo} from '@copor/checklist/client/Checklist/DeleteChecklist/repo/fake/FakeDeleteChecklistLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteChecklistLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteChecklist>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForDeleteChecklist>> {
		return {
			[DBEnv.FAKE]: FakeDeleteChecklistLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
