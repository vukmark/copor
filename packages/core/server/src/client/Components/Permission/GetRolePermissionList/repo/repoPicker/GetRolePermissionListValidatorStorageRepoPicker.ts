import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {
	ValidateGetRolePermissionListRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateGetRolePermissionListRepo';
import {IsInvalidRoleRepo} from '@copor/core/domain/Components/Role/repository/IsInvalidRoleRepo';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeGetRolePermissionListValidatorStorageRepo} from '../fake/FakeGetRolePermissionListValidatorStorageRepo';
import {
	KyselyGetRolePermissionListValidatorStorageRepo
} from '@copor/core/client/Components/Permission/GetRolePermissionList/repo/kysely/KyselyGetRolePermissionListValidatorStorageRepo';

export class GetRolePermissionListValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetRolePermissionListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidRoleRepo> {
		return {
			[DBEnv.FAKE]: FakeGetRolePermissionListValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetRolePermissionListValidatorStorageRepo
		};
	}
}
