import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {UserGroupHasChildrenException} from '../../exception/UserGroupHasChildrenException';
import {DoesUserGroupHaveNoChildrenRepo} from '../../repository/DoesUserGroupHaveNoChildrenRepo';

export class ValidateDoesUserGroupHaveChildren extends ValidatorWithRepo<DoesUserGroupHaveNoChildrenRepo, string> {
	public async validate(): Promise<void> {
		if (await this.repository.doesUserGroupHaveChildren(this.input))
			throw new UserGroupHasChildrenException();
	}
}