import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsUserNotInUserGroupRepo} from '@copor/cloud/domain/Cloud/repository/IsUserNotInUserGroupRepo';
import {UserNotInUserGroupException} from '@copor/cloud/domain/Cloud/exception/UserNotInUserGroupException';

interface ValidateIsUserInUserGroupDTO {
	userId: string | undefined;
	userGroupId: string | undefined;
}

export class ValidateIsUserInUserGroup extends ValidatorWithRepo<IsUserNotInUserGroupRepo, ValidateIsUserInUserGroupDTO> {
	public async validate(): Promise<void> {
		if (await this.repository.isUserNotInUserGroup(this.input?.userId, this.input?.userGroupId))
			throw new UserNotInUserGroupException();
	}
}
