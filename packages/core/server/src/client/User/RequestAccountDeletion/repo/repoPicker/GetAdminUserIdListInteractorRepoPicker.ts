import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetAdminUserIdListRepo} from '@copor/core/domain/User/repository/GetAdminUserIdListRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetAdminUserIdListInteractorRepo}
	from '@copor/core/client/User/RequestAccountDeletion/repo/fake/FakeGetAdminUserIdListInteractorRepo';
import {KyselyGetAdminUserIdListInteractorRepo}
	from '@copor/core/client/User/RequestAccountDeletion/repo/kysely/KyselyGetAdminUserIdListInteractorRepo';

export class GetAdminUserIdListInteractorRepoPicker extends NewRepositoryPicker<GetAdminUserIdListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetAdminUserIdListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetAdminUserIdListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetAdminUserIdListInteractorRepo
		};
	}
}
