import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {DefaultRoleException} from '@copor/core/domain/Components/Role/exception/DefaultRoleException';
import {IsDefaultRoleForRoleTypeRepo} from '@copor/core/domain/Components/Role/repository/IsDefaultRoleForRoleTypeRepo';

export class ValidateIsDefaultRoleForRoleType extends ValidatorWithRepo<IsDefaultRoleForRoleTypeRepo, string> {
	public async validate(): Promise<void> {
		if (await this.repository.isDefaultRoleForRoleType(this.input))
			throw new DefaultRoleException();
	}
}