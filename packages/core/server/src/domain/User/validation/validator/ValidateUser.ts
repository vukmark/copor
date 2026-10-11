import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';

export class ValidateUser extends ValidatorWithRepo<IsNotValidUserRepo, string | undefined> {
	public async validate(): Promise<void> {
		if (await this.repository.isNotValidUser(this.input))
			throw new InvalidUserException();
	}
}