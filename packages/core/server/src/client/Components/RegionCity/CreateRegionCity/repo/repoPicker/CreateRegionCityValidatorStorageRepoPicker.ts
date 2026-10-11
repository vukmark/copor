import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateCreateRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateCreateRegionCityRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateRegionCityValidatorStorageRepo
} from '@copor/core/client/Components/RegionCity/CreateRegionCity/repo/fake/FakeCreateRegionCityValidatorStorageRepo';
import {
	KyselyCreateRegionCityValidatorStorageRepo
} from '@copor/core/client/Components/RegionCity/CreateRegionCity/repo/kysely/KyselyCreateRegionCityValidatorStorageRepo';

export class CreateRegionCityValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateCreateRegionCityRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> ValidateCreateRegionCityRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateRegionCityValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateRegionCityValidatorStorageRepo
		};
	}
}