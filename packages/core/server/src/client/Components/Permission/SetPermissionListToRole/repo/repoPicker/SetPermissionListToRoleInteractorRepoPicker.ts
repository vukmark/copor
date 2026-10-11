import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeSetPermissionListToRoleInteractorRepo} from '../fake/FakeSetPermissionListToRoleInteractorRepo';
import {KyselySetPermissionListToRoleInteractorRepo} from '@copor/core/client/Components/Permission/SetPermissionListToRole/repo/kysely/KyselySetPermissionListToRoleInteractorRepo';
import {SetPermissionListToRoleDTO} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export class SetPermissionListToRoleInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SetPermissionListToRoleDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SetPermissionListToRoleDTO>> {
		return {
			[DBEnv.FAKE]: FakeSetPermissionListToRoleInteractorRepo,
			[DBEnv.KYSELY]: KyselySetPermissionListToRoleInteractorRepo
		};
	}
}
