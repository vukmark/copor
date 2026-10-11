import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateChecklistItemLoggerRepo} from '../fake/FakeUpdateChecklistItemLoggerRepo';
import {LogDataForUpdateChecklistItem} from '@copor/checklist/domain/ChecklistItem/logger/LogUpdateChecklistItem';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateChecklistItemLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateChecklistItem>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateChecklistItem>> {
		return {
			[DBEnv.FAKE]: FakeUpdateChecklistItemLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
