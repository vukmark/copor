import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSetPermissionListToUserInteractorRepo} from '../fake/FakeSetPermissionListToUserInteractorRepo';
import {SetPermissionListToUserDTO} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToUserDTO';
import {
	KyselySetPermissionListToUserInteractorRepo
} from '@copor/core/client/Components/Permission/SetPermissionListToUser/repo/kysely/KyselySetPermissionListToUserInteractorRepo';

export class SetPermissionListToUserInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SetPermissionListToUserDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SetPermissionListToUserDTO>> {
		return {
			[DBEnv.FAKE]: FakeSetPermissionListToUserInteractorRepo,
			[DBEnv.KYSELY]: KyselySetPermissionListToUserInteractorRepo
		};
	}
}
