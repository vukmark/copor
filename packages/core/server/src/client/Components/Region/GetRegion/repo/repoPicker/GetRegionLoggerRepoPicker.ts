import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetRegion} from '@copor/core/domain/Components/Region/logger/LogGetRegion';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetRegionLoggerRepo} from '../fake/FakeGetRegionLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetRegionLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetRegion>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForGetRegion>> {
		return {
			[DBEnv.FAKE]: FakeGetRegionLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
