import {
	ValidateGetUserGroupPermissionListRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateGetUserGroupPermissionListRepo';
import {UserGroupKyselyHelper} from '@copor/core/client/UserGroup/repositoryHelper/UserGroupKyselyHelper';

export class KyselyGetUserGroupPermissionListValidatorStorageRepo implements ValidateGetUserGroupPermissionListRepo {
	isInvalidUserGroup(userGroupId: string | undefined): Promise<boolean> {
		return UserGroupKyselyHelper.isInvalidUserGroup(userGroupId);
	}
}
