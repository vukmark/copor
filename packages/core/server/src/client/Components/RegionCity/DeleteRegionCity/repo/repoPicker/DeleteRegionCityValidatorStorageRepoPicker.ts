import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateDeleteRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateDeleteRegionCityRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteRegionCityValidatorStorageRepo
} from '@copor/core/client/Components/RegionCity/DeleteRegionCity/repo/fake/FakeDeleteRegionCityValidatorStorageRepo';
import {
	KyselyDeleteRegionCityValidatorStorageRepo
} from '@copor/core/client/Components/RegionCity/DeleteRegionCity/repo/kysely/KyselyDeleteRegionCityValidatorStorageRepo';

export class DeleteRegionCityValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateDeleteRegionCityRepo> {
	protected getRepositoryList(): Record<string, new(appContext: AppContext)
	=> ValidateDeleteRegionCityRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteRegionCityValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteRegionCityValidatorStorageRepo
		};
	}
}