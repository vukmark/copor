import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {CancelAccountDeletionRepo} from '@copor/core/domain/User/repository/CancelAccountDeletionRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCancelAccountDeletionInteractorRepo}
	from '@copor/core/client/User/CancelAccountDeletion/repo/fake/FakeCancelAccountDeletionInteractorRepo';
import {KyselyCancelAccountDeletionInteractorRepo}
	from '@copor/core/client/User/CancelAccountDeletion/repo/kysely/KyselyCancelAccountDeletionInteractorRepo';

export class CancelAccountDeletionInteractorRepoPicker extends NewRepositoryPicker<CancelAccountDeletionRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => CancelAccountDeletionRepo> {
		return {
			[DBEnv.FAKE]: FakeCancelAccountDeletionInteractorRepo,
			[DBEnv.KYSELY]: KyselyCancelAccountDeletionInteractorRepo
		};
	}
}
