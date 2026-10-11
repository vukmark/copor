import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteFileValidatorStorageRepo
} from '@copor/cloud/client/Cloud/DeleteFile/repo/fake/FakeDeleteFileValidatorStorageRepo';
import {ValidateDeleteFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateDeleteFileRepo';
import {
	KyselyDeleteFileValidatorStorageRepo
} from '@copor/cloud/client/Cloud/DeleteFile/repo/kysely/KyselyDeleteFileValidatorStorageRepo';

export class DeleteFileValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateDeleteFileRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteFileRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteFileValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteFileValidatorStorageRepo
		};
	}
}
