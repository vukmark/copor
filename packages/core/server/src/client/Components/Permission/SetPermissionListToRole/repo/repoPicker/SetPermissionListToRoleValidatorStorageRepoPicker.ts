import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeSetPermissionListToRoleValidatorStorageRepo} from '../fake/FakeSetPermissionListToRoleValidatorStorageRepo';
import {
	ValidateSetPermissionListToRoleRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateSetPermissionListToRoleRepo';
import {
	KyselySetPermissionListToRoleValidatorStorageRepo
} from '@copor/core/client/Components/Permission/SetPermissionListToRole/repo/kysely/KyselySetPermissionListToRoleValidatorStorageRepo';

export class SetPermissionListToRoleValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateSetPermissionListToRoleRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateSetPermissionListToRoleRepo> {
		return {
			[DBEnv.FAKE]: FakeSetPermissionListToRoleValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselySetPermissionListToRoleValidatorStorageRepo
		};
	}
}
