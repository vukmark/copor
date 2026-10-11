import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteCloudCategoryValidatorStorageRepo}
	from '@copor/cloud/client/Cloud/CloudCategory/DeleteCloudCategory/repo/fake/FakeDeleteCloudCategoryValidatorStorageRepo';
import {ValidateDeleteCloudCategoryRepo}
	from '@copor/cloud/domain/Cloud/CloudCategory/repository/ValidateDeleteCloudCategoryRepo';
import {KyselyDeleteCloudCategoryValidatorStorageRepo}
	from '@copor/cloud/client/Cloud/CloudCategory/DeleteCloudCategory/repo/kysely/KyselyDeleteCloudCategoryValidatorStorageRepo';

export class DeleteCloudCategoryValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateDeleteCloudCategoryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteCloudCategoryRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteCloudCategoryValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteCloudCategoryValidatorStorageRepo
		};
	}
}
