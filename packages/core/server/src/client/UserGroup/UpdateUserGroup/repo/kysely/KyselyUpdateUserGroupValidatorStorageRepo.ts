import {
	ValidateUpdateUserGroupRepo
} from '@copor/core/domain/UserGroup/repository/ValidateUpdateUserGroupRepo';
import {UserGroupKyselyHelper} from '@copor/core/client/UserGroup/repositoryHelper/UserGroupKyselyHelper';

export class KyselyUpdateUserGroupValidatorStorageRepo implements ValidateUpdateUserGroupRepo {
	public isInvalidUserGroup(userGroupId: string): Promise<boolean> {
		return UserGroupKyselyHelper.isInvalidUserGroup(userGroupId);
	}
}
