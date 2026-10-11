import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsInvalidUserPasswordRepo} from '@copor/core/domain/User/repository/IsInvalidUserPasswordRepo';
import {ValidateUserPasswordDTO} from '@copor/core/domain/User/validation/dto/ValidateUserPasswordDTO';
import {InvalidUserPasswordException} from '@copor/core/domain/User/exception/InvalidUserPasswordException';

export class ValidateUserPassword extends ValidatorWithRepo<IsInvalidUserPasswordRepo, ValidateUserPasswordDTO> {
	public async validate(): Promise<void> {
		if (!this.input)
			throw new InvalidUserPasswordException();
		if (await this.repository.isInvalidUserPassword(this.input.userId, this.input.password))
			throw new InvalidUserPasswordException();
	}
}