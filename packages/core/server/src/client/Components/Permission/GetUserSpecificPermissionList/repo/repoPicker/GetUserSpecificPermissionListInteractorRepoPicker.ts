import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserSpecificPermissionListInteractorRepo} from '../fake/FakeGetUserSpecificPermissionListInteractorRepo';
import {GetUserSpecificPermissionListRepo} from '@copor/core/domain/Components/Permission/repository/GetUserSpecificPermissionListRepo';
import {
	KyselyGetUserSpecificPermissionListInteractorRepo
} from '@copor/core/client/Components/Permission/GetUserSpecificPermissionList/repo/kysely/KyselyGetUserSpecificPermissionListInteractorRepo';

export class GetUserSpecificPermissionListInteractorRepoPicker extends NewRepositoryPicker<GetUserSpecificPermissionListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetUserSpecificPermissionListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetUserSpecificPermissionListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetUserSpecificPermissionListInteractorRepo
		};
	}
}
