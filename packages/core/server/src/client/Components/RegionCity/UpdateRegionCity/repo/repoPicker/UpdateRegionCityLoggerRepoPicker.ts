import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {LogDataForUpdateRegionCity} from '@copor/core/domain/Components/RegionCity/logger/LogUpdateRegionCity';
import {
	FakeUpdateRegionCityLoggerRepo
} from '@copor/core/client/Components/RegionCity/UpdateRegionCity/repo/fake/FakeUpdateRegionCityLoggerRepo';

export class UpdateRegionCityLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateRegionCity>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForUpdateRegionCity>> {
		return {
			[DBEnv.FAKE]: FakeUpdateRegionCityLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
