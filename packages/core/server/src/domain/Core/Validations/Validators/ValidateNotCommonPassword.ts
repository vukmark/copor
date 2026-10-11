import {ValidatorWithRepo} from './ValidatorWithRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordPolicyContextDTO} from '@copor/core/domain/Core/Validations/Validators/dto/PasswordPolicyContextDTO';
import {PasswordIsCommonException} from '@copor/core/domain/Core/Exceptions/invalid/PasswordIsCommonException';

export class ValidateNotCommonPassword extends ValidatorWithRepo<GetPasswordPolicyRepo, PasswordPolicyContextDTO> {
	public async validate(): Promise<void> {
		if (!this.input) return;

		const policy = await this.repository.getPasswordPolicy();

		if (!policy.blockCommonPasswords) return;

		const password = this.input.password.toLowerCase();

		if (policy.commonPasswords.some((commonPassword) => commonPassword.toLowerCase() === password)) {
			throw new PasswordIsCommonException();
		}
	}
}
