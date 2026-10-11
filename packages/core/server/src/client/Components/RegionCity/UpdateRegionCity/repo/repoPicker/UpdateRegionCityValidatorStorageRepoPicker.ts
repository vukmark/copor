import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeUpdateRegionCityValidatorRepo
} from '@copor/core/client/Components/RegionCity/UpdateRegionCity/repo/fake/FakeUpdateRegionCityValidatorRepo';
import {
	KyselyUpdateRegionCityValidatorStorageRepo
} from '@copor/core/client/Components/RegionCity/UpdateRegionCity/repo/kysely/KyselyUpdateRegionCityValidatorStorageRepo';
import {ValidateUpdateRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateUpdateRegionCityRepo';

export class UpdateRegionCityValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateRegionCityRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateRegionCityRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateRegionCityValidatorRepo,
			[DBEnv.KYSELY]: KyselyUpdateRegionCityValidatorStorageRepo
		};
	}
}
