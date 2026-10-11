import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';

import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateCloudCategoryValidatorStorageRepo} from '../fake/FakeUpdateCloudCategoryValidatorStorageRepo';
import {ValidateUpdateCloudCategoryRepo}
	from '@copor/cloud/domain/Cloud/CloudCategory/repository/ValidateUpdateCloudCategoryRepo';
import {KyselyUpdateCloudCategoryValidatorStorageRepo}
	from '@copor/cloud/client/Cloud/CloudCategory/UpdateCloudCategory/repo/kysely/KyselyUpdateCloudCategoryValidatorStorageRepo';

export class UpdateCloudCategoryValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateCloudCategoryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateCloudCategoryRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateCloudCategoryValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateCloudCategoryValidatorStorageRepo
		};
	}
}
