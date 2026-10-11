import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetChecklist} from '@copor/checklist/domain/Checklist/logger/LogGetChecklist';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetChecklistLoggerRepo} from '../fake/FakeGetChecklistLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetChecklistLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetChecklist>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetChecklist>> {
		return {
			[DBEnv.KYSELY]: KyselyLogRepository,
			[DBEnv.FAKE]: FakeGetChecklistLoggerRepo
		};
	}
}
