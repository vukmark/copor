import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserGroupTreeInteractorRepo} from '../fake/FakeGetUserGroupTreeInteractorRepo';
import {GetUserGroupTreeDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupTreeDTO';
import {
	KyselyGetUserGroupTreeInteractorRepo
} from '@copor/core/client/UserGroup/GetUserGroupTree/repo/kysely/KyselyGetUserGroupTreeInteractorRepo';

export class GetUserGroupTreeInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetUserGroupTreeDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetUserGroupTreeDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetUserGroupTreeInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetUserGroupTreeInteractorRepo
		};
	}
}
