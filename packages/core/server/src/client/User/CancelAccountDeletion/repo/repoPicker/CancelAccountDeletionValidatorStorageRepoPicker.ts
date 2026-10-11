import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateCancelAccountDeletionRepo} from '@copor/core/domain/User/repository/ValidateCancelAccountDeletionRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCancelAccountDeletionValidatorStorageRepo}
	from '@copor/core/client/User/CancelAccountDeletion/repo/fake/FakeCancelAccountDeletionValidatorStorageRepo';
import {KyselyCancelAccountDeletionValidatorStorageRepo}
	from '@copor/core/client/User/CancelAccountDeletion/repo/kysely/KyselyCancelAccountDeletionValidatorStorageRepo';

export class CancelAccountDeletionValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateCancelAccountDeletionRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCancelAccountDeletionRepo> {
		return {
			[DBEnv.FAKE]: FakeCancelAccountDeletionValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCancelAccountDeletionValidatorStorageRepo
		};
	}
}
