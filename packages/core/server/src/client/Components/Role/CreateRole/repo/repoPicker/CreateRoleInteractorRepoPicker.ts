import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/SaveRoleDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateRoleInteractorRepo} from '../fake/FakeCreateRoleInteractorRepo';
import {KyselyCreateRoleInteractorRepo} from '@copor/core/client/Components/Role/CreateRole/repo/kysely/KyselyCreateRoleInteractorRepo';

export class CreateRoleInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveRoleDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveRoleDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateRoleInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateRoleInteractorRepo
		};
	}
}
