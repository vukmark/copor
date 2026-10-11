import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateGetRegionCityRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {IsInvalidRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/IsInvalidRegionCityRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeGetRegionCityValidatorStorageRepo
} from '@copor/core/client/Components/RegionCity/GetRegionCity/repo/fake/FakeGetRegionCityValidatorStorageRepo';
import {
	KyselyGetRegionCityValidatorStorageRepo
} from '@copor/core/client/Components/RegionCity/GetRegionCity/repo/kysely/KyselyGetRegionCityValidatorStorageRepo';

export class GetRegionCityValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetRegionCityRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidRegionCityRepo> {
		return {
			[DBEnv.FAKE]: FakeGetRegionCityValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetRegionCityValidatorStorageRepo
		};
	}
}