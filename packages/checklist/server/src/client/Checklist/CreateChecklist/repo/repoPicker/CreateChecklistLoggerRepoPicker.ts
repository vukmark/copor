import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogDataForCreateChecklist} from '@copor/checklist/domain/Checklist/logger/LogCreateChecklist';
import {FakeCreateChecklistLoggerRepo} from '@copor/checklist/client/Checklist/CreateChecklist/repo/fake/FakeCreateChecklistLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateChecklistLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateChecklist>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForCreateChecklist>> {
		return {
			[DBEnv.FAKE]: FakeCreateChecklistLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
