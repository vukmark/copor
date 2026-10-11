import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateUpdateRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateUpdateRegionRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateRegionValidatorStorageRepo} from '../fake/FakeUpdateRegionValidatorStorageRepo';
import {
	KyselyUpdateRegionValidatorStorageRepo
} from '@copor/core/client/Components/Region/UpdateRegion/repo/kysely/KyselyUpdateRegionValidatorStorageRepo';

export class UpdateRegionValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateRegionRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateRegionRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateRegionValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateRegionValidatorStorageRepo
		};
	}
}
