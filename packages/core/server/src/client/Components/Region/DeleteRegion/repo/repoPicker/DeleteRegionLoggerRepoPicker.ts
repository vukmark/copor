import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteRegion} from '@copor/core/domain/Components/Region/logger/LogDeleteRegion';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteRegionLoggerRepo} from '../fake/FakeDeleteRegionLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteRegionLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteRegion>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForDeleteRegion>> {
		return {
			[DBEnv.FAKE]: FakeDeleteRegionLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}