import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetRoleListInteractorRepo} from '../fake/FakeGetRoleListInteractorRepo';
import {KyselyGetRoleListInteractorRepo} from '@copor/core/client/Components/Role/GetRoleList/repo/kysely/KyselyGetRoleListInteractorRepo';

export class GetRoleListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetRoleDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetRoleDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetRoleListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetRoleListInteractorRepo
		};
	}
}
