import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetCloudCategoryValidatorStorageRepo} from '../fake/FakeGetCloudCategoryValidatorStorageRepo';
import {ValidateGetCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/ValidateGetCloudCategoryRepo';
import {IsInvalidCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/IsInvalidCloudCategoryRepo';
import {KyselyGetCloudCategoryValidatorStorageRepo}
	from '@copor/cloud/client/Cloud/CloudCategory/GetCloudCategory/repo/kysely/KyselyGetCloudCategoryValidatorStorageRepo';

export class GetCloudCategoryValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetCloudCategoryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidCloudCategoryRepo> {
		return {
			[DBEnv.FAKE]: FakeGetCloudCategoryValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetCloudCategoryValidatorStorageRepo
		};
	}
}
