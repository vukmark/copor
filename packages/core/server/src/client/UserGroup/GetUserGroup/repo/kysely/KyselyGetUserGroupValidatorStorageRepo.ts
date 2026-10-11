import {
	ValidateGetUserGroupRepo
} from '@copor/core/domain/UserGroup/repository/ValidateGetUserGroupRepo';
import {UserGroupKyselyHelper} from '@copor/core/client/UserGroup/repositoryHelper/UserGroupKyselyHelper';

export class KyselyGetUserGroupValidatorStorageRepo implements ValidateGetUserGroupRepo {
	isInvalidUserGroup(userGroupId: string | undefined): Promise<boolean> {
		return UserGroupKyselyHelper.isInvalidUserGroup(userGroupId);
	}
}
