import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateFileValidatorStorageRepo
} from '@copor/cloud/client/Cloud/CreateFile/repo/fake/FakeCreateFileValidatorStorageRepo';
import {ValidateCreateFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateCreateFileRepo';
import {
	KyselyCreateFileValidatorStorageRepo
} from '@copor/cloud/client/Cloud/CreateFile/repo/kysely/KyselyCreateFileValidatorStorageRepo';

export class CreateFileValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateCreateFileRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreateFileRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateFileValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateFileValidatorStorageRepo
		};
	}
}
