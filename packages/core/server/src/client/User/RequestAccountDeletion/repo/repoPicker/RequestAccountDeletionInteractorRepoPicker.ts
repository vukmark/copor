import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {RequestAccountDeletionRepo} from '@copor/core/domain/User/repository/RequestAccountDeletionRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeRequestAccountDeletionInteractorRepo}
	from '@copor/core/client/User/RequestAccountDeletion/repo/fake/FakeRequestAccountDeletionInteractorRepo';
import {KyselyRequestAccountDeletionInteractorRepo}
	from '@copor/core/client/User/RequestAccountDeletion/repo/kysely/KyselyRequestAccountDeletionInteractorRepo';

export class RequestAccountDeletionInteractorRepoPicker extends NewRepositoryPicker<RequestAccountDeletionRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => RequestAccountDeletionRepo> {
		return {
			[DBEnv.FAKE]: FakeRequestAccountDeletionInteractorRepo,
			[DBEnv.KYSELY]: KyselyRequestAccountDeletionInteractorRepo
		};
	}
}
