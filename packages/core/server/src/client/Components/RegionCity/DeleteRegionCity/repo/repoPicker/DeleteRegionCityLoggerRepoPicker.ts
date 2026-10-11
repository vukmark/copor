import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteRegionCity} from '@copor/core/domain/Components/RegionCity/logger/LogDeleteRegionCity';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteRegionCityLoggerRepo
} from '@copor/core/client/Components/RegionCity/DeleteRegionCity/repo/fake/FakeDeleteRegionCityLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteRegionCityLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteRegionCity>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForDeleteRegionCity>> {
		return {
			[DBEnv.FAKE]: FakeDeleteRegionCityLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}