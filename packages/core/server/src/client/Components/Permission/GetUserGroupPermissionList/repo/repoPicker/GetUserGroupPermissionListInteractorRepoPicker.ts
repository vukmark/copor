import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserGroupPermissionListInteractorRepo} from '../fake/FakeGetUserGroupPermissionListInteractorRepo';
import {GetUserGroupPermissionListRepo} from '@copor/core/domain/Components/Permission/repository/GetUserGroupPermissionListRepo';
import {
	KyselyGetUserGroupPermissionListInteractorRepo
} from '@copor/core/client/Components/Permission/GetUserGroupPermissionList/repo/kysely/KyselyGetUserGroupPermissionListInteractorRepo';

export class GetUserGroupPermissionListInteractorRepoPicker extends NewRepositoryPicker<GetUserGroupPermissionListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetUserGroupPermissionListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetUserGroupPermissionListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetUserGroupPermissionListInteractorRepo
		};
	}
}
