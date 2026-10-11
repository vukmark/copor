import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateRequestAccountDeletionRepo} from '@copor/core/domain/User/repository/ValidateRequestAccountDeletionRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeRequestAccountDeletionValidatorStorageRepo}
	from '@copor/core/client/User/RequestAccountDeletion/repo/fake/FakeRequestAccountDeletionValidatorStorageRepo';
import {KyselyRequestAccountDeletionValidatorStorageRepo}
	from '@copor/core/client/User/RequestAccountDeletion/repo/kysely/KyselyRequestAccountDeletionValidatorStorageRepo';

export class RequestAccountDeletionValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateRequestAccountDeletionRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateRequestAccountDeletionRepo> {
		return {
			[DBEnv.FAKE]: FakeRequestAccountDeletionValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyRequestAccountDeletionValidatorStorageRepo
		};
	}
}
