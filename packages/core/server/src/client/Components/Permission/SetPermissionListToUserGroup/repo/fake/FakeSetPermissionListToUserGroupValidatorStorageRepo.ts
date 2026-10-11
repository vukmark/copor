import {
	ValidateSetPermissionListToUserGroupRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateSetPermissionListToUserGroupRepo';


export class FakeSetPermissionListToUserGroupValidatorStorageRepo implements ValidateSetPermissionListToUserGroupRepo {
	isInvalidUserGroup(userGroupId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
