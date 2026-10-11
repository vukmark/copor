import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsUsernameTakenRepo} from '@copor/core/domain/Registration/repository/IsUsernameTakenRepo';
import {InvalidUsernameException} from '@copor/core/domain/User/exception/InvalidUsernameException';
import {AuthUsernameAlreadyInUseException} from '@copor/core/domain/User/exception/AuthUsernameAlreadyInUseException';

// 3–50 characters: letters, digits, dot, underscore, hyphen.
const USERNAME_PATTERN = /^[A-Za-z0-9._-]{3,50}$/;

export class ValidateNewUsername extends ValidatorWithRepo<IsUsernameTakenRepo, string> {
	public async validate(): Promise<void> {
		const userName = this.input ?? '';

		if (!USERNAME_PATTERN.test(userName))
			throw new InvalidUsernameException('InvalidUsernameException');
		if (await this.repository.isUsernameTaken(userName))
			throw new AuthUsernameAlreadyInUseException();
	}
}
