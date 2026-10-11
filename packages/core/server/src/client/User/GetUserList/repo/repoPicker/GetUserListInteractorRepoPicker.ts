import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserListInteractorRepo} from '../fake/FakeGetUserListInteractorRepo';
import {KyselyGetUserListInteractorRepo} from '@copor/core/client/User/GetUserList/repo/kysely/KyselyGetUserListInteractorRepo';

export class GetUserListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetUserDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetUserDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetUserListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetUserListInteractorRepo
		};
	}
}
