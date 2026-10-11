import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateRegion} from '@copor/core/domain/Components/Region/logger/LogUpdateRegion';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateRegionLoggerRepo} from '../fake/FakeUpdateRegionLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateRegionLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateRegion>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForUpdateRegion>> {
		return {
			[DBEnv.FAKE]: FakeUpdateRegionLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
