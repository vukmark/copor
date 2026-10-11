import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeDeleteRoleInteractorRepo} from '../fake/FakeDeleteRoleInteractorRepo';
import {KyselyDeleteRoleInteractorRepo} from '@copor/core/client/Components/Role/DeleteRole/repo/kysely/KyselyDeleteRoleInteractorRepo';

export class DeleteRoleInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteRoleInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteRoleInteractorRepo
		};
	}
}
