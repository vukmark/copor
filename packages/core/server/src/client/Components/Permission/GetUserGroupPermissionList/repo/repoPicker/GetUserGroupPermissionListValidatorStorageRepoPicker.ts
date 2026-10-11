import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserGroupPermissionListValidatorStorageRepo} from '../fake/FakeGetUserGroupPermissionListValidatorStorageRepo';
import {
	ValidateGetUserGroupPermissionListRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateGetUserGroupPermissionListRepo';
import {
	KyselyGetUserGroupPermissionListValidatorStorageRepo
} from '@copor/core/client/Components/Permission/GetUserGroupPermissionList/repo/kysely/KyselyGetUserGroupPermissionListValidatorStorageRepo';

export class GetUserGroupPermissionListValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetUserGroupPermissionListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateGetUserGroupPermissionListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetUserGroupPermissionListValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetUserGroupPermissionListValidatorStorageRepo
		};
	}
}
