import {ValidatorWithRepo} from './ValidatorWithRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordPolicyContextDTO} from '@copor/core/domain/Core/Validations/Validators/dto/PasswordPolicyContextDTO';
import {
	PasswordTooManyRepeatedCharactersException
} from '@copor/core/domain/Core/Exceptions/invalid/PasswordTooManyRepeatedCharactersException';

export class ValidateMaxRepeatedCharactersInPassword
	extends ValidatorWithRepo<GetPasswordPolicyRepo, PasswordPolicyContextDTO> {
	public async validate(): Promise<void> {
		if (!this.input)
			return;

		const policy = await this.repository.getPasswordPolicy();

		if (policy.maxRepeatedCharacters <= 0)
			return;

		const pattern = new RegExp(`(.)\\1{${policy.maxRepeatedCharacters},}`);

		if (pattern.test(this.input.password)) {
			throw new PasswordTooManyRepeatedCharactersException();
		}
	}
}
