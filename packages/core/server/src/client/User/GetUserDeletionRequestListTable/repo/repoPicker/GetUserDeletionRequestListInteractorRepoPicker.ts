import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetUserDeletionRequestDTO} from '@copor/core/domain/User/interactor/dto/GetUserDeletionRequestDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserDeletionRequestListInteractorRepo}
	from '@copor/core/client/User/GetUserDeletionRequestListTable/repo/fake/FakeGetUserDeletionRequestListInteractorRepo';
import {KyselyGetUserDeletionRequestListInteractorRepo}
	from '@copor/core/client/User/GetUserDeletionRequestListTable/repo/kysely/KyselyGetUserDeletionRequestListInteractorRepo';

export class GetUserDeletionRequestListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetUserDeletionRequestDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetUserDeletionRequestDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetUserDeletionRequestListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetUserDeletionRequestListInteractorRepo
		};
	}
}
