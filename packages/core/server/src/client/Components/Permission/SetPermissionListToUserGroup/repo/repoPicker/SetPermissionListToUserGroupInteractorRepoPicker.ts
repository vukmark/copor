import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSetPermissionListToUserGroupInteractorRepo} from '../fake/FakeSetPermissionListToUserGroupInteractorRepo';
import {
	SetPermissionListToUserGroupDTO
} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToUserGroupDTO';
import {
	KyselySetPermissionListToUserGroupInteractorRepo
} from '@copor/core/client/Components/Permission/SetPermissionListToUserGroup/repo/kysely/KyselySetPermissionListToUserGroupInteractorRepo';

export class SetPermissionListToUserGroupInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SetPermissionListToUserGroupDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SetPermissionListToUserGroupDTO>> {
		return {
			[DBEnv.FAKE]: FakeSetPermissionListToUserGroupInteractorRepo,
			[DBEnv.KYSELY]: KyselySetPermissionListToUserGroupInteractorRepo
		};
	}
}
