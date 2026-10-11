import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateRegion} from '@copor/core/domain/Components/Region/logger/LogCreateRegion';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateRegionLoggerRepo} from '../fake/FakeCreateRegionLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateRegionLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateRegion>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForCreateRegion>> {
		return {
			[DBEnv.FAKE]: FakeCreateRegionLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
