
import {FakeGetUserCompletePermissionListInteractorRepo} from '../fake/FakeGetUserCompletePermissionListInteractorRepo';
import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {GetAllPermissionsForUserRepo} from '@copor/core/domain/Components/Permission/repository/GetAllPermissionsForUserRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyGetUserCompletePermissionListInteractorRepo
} from '@copor/core/client/Components/Permission/GetUserCompletePermissionList/repo/kysely/KyselyGetUserCompletePermissionListInteractorRepo';

export class GetUserCompletePermissionListInteractorRepoPicker extends NewRepositoryPicker<GetAllPermissionsForUserRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetAllPermissionsForUserRepo> {
		return {
			[DBEnv.FAKE]: FakeGetUserCompletePermissionListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetUserCompletePermissionListInteractorRepo
		};
	}
}
