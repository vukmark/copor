import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateChecklist} from '@copor/checklist/domain/Checklist/logger/LogUpdateChecklist';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateChecklistLoggerRepo} from '../fake/FakeUpdateChecklistLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateChecklistLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateChecklist>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateChecklist>> {
		return {
			[DBEnv.FAKE]: FakeUpdateChecklistLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
