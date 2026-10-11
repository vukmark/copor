import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetRolePermissionListInteractorRepo} from '../fake/FakeGetRolePermissionListInteractorRepo';
import {KyselyGetRolePermissionListInteractorRepo}
	from '@copor/core/client/Components/Permission/GetRolePermissionList/repo/kysely/KyselyGetRolePermissionListInteractorRepo';
import {GetRolePermissionListRepo} from '@copor/core/domain/Components/Permission/repository/GetRolePermissionListRepo';

export class GetRolePermissionListInteractorRepoPicker extends NewRepositoryPicker<GetRolePermissionListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetRolePermissionListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetRolePermissionListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetRolePermissionListInteractorRepo
		};
	}
}
