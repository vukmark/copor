import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {CountUserDeletionRequestsRepo} from '@copor/core/domain/User/repository/CountUserDeletionRequestsRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCountUserDeletionRequestsInteractorRepo}
	from '@copor/core/client/User/CountUserDeletionRequests/repo/fake/FakeCountUserDeletionRequestsInteractorRepo';
import {KyselyCountUserDeletionRequestsInteractorRepo}
	from '@copor/core/client/User/CountUserDeletionRequests/repo/kysely/KyselyCountUserDeletionRequestsInteractorRepo';

export class CountUserDeletionRequestsInteractorRepoPicker extends NewRepositoryPicker<CountUserDeletionRequestsRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => CountUserDeletionRequestsRepo> {
		return {
			[DBEnv.FAKE]: FakeCountUserDeletionRequestsInteractorRepo,
			[DBEnv.KYSELY]: KyselyCountUserDeletionRequestsInteractorRepo
		};
	}
}
