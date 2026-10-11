import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateDeleteRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateDeleteRegionRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteRegionValidatorStorageRepo} from '../fake/FakeDeleteRegionValidatorStorageRepo';
import {KyselyDeleteRegionValidatorStorageRepo}
	from '@copor/core/client/Components/Region/DeleteRegion/repo/kysely/KyselyDeleteRegionValidatorStorageRepo';

export class DeleteRegionValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateDeleteRegionRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> ValidateDeleteRegionRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteRegionValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteRegionValidatorStorageRepo
		};
	}
}