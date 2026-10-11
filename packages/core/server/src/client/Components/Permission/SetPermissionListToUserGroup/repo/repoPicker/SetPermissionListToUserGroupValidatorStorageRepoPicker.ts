import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSetPermissionListToUserGroupValidatorStorageRepo} from '../fake/FakeSetPermissionListToUserGroupValidatorStorageRepo';
import {
	ValidateSetPermissionListToUserGroupRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateSetPermissionListToUserGroupRepo';
import {
	KyselySetPermissionListToUserGroupValidatorStorageRepo
} from '@copor/core/client/Components/Permission/SetPermissionListToUserGroup/repo/kysely/KyselySetPermissionListToUserGroupValidatorStorageRepo';

export class SetPermissionListToUserGroupValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateSetPermissionListToUserGroupRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateSetPermissionListToUserGroupRepo> {
		return {
			[DBEnv.FAKE]: FakeSetPermissionListToUserGroupValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselySetPermissionListToUserGroupValidatorStorageRepo
		};
	}
}
