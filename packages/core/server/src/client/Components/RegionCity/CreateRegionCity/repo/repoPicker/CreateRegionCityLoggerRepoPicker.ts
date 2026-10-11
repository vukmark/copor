import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateRegionCity} from '@copor/core/domain/Components/RegionCity/logger/LogCreateRegionCity';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateRegionCityLoggerRepo
} from '@copor/core/client/Components/RegionCity/CreateRegionCity/repo/fake/FakeCreateRegionCityLoggerRepo';
import {
	KyselyCreateRegionCityLoggerRepo
} from '@copor/core/client/Components/RegionCity/CreateRegionCity/repo/kysely/KyselyCreateRegionCityLoggerRepo';

export class CreateRegionCityLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateRegionCity>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForCreateRegionCity>> {
		return {
			[DBEnv.FAKE]: FakeCreateRegionCityLoggerRepo,
			[DBEnv.KYSELY]: KyselyCreateRegionCityLoggerRepo
		};
	}
}