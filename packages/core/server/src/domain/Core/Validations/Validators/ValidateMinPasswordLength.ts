import {ValidatorWithRepo} from './ValidatorWithRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordPolicyContextDTO} from '@copor/core/domain/Core/Validations/Validators/dto/PasswordPolicyContextDTO';
import {PasswordTooShortException} from '@copor/core/domain/Core/Exceptions/invalid/PasswordTooShortException';

export class ValidateMinPasswordLength extends ValidatorWithRepo<GetPasswordPolicyRepo, PasswordPolicyContextDTO> {
	public async validate(): Promise<void> {
		if (!this.input)
			return;

		const policy = await this.repository.getPasswordPolicy();

		if (this.input.password.length < policy.minPasswordLength) {
			throw new PasswordTooShortException();
		}
	}
}
