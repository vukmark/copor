import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeGetRegionCityListLoggerRepo
} from '@copor/core/client/Components/RegionCity/GetRegionCityList/repo/fake/FakeGetRegionCityListLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetRegionCityListLoggerRepoPicker
	extends NewRepositoryPicker<NoDataLogRepository> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => NoDataLogRepository> {
		return {
			[DBEnv.FAKE]: FakeGetRegionCityListLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}