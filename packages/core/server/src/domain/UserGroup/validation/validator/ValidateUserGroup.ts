import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidUserGroupException} from '@copor/core/domain/UserGroup/exception/InvalidUserGroupException';
import {IsInvalidUserGroupRepo} from '@copor/core/domain/UserGroup/repository/IsNotValidUserGroupRepo';

export class ValidateUserGroup extends ValidatorWithRepo<IsInvalidUserGroupRepo, string | undefined> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidUserGroup(this.input))
			throw new InvalidUserGroupException();
	}
}