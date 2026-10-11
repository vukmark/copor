import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogDataForGetRegionCity} from '@copor/core/domain/Components/RegionCity/logger/LogGetRegionCity';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {
	FakeGetRegionCityLoggerRepo
} from '@copor/core/client/Components/RegionCity/GetRegionCity/repo/fake/FakeGetRegionCityLoggerRepo';

export class GetRegionCityLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetRegionCity>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForGetRegionCity>> {
		return {
			[DBEnv.FAKE]: FakeGetRegionCityLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}