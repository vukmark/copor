import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserGroupListInteractorRepo} from '../fake/FakeGetUserGroupListInteractorRepo';
import {
	KyselyGetUserGroupListInteractorRepo
} from '@copor/core/client/UserGroup/GetUserGroupList/repo/kysely/KyselyGetUserGroupListInteractorRepo';

export class GetUserGroupListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetUserGroupDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetUserGroupDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetUserGroupListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetUserGroupListInteractorRepo
		};
	}
}
