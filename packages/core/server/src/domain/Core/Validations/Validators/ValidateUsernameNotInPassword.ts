import {ValidatorWithRepo} from './ValidatorWithRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordPolicyContextDTO} from '@copor/core/domain/Core/Validations/Validators/dto/PasswordPolicyContextDTO';
import {PasswordContainsUsernameException} from '@copor/core/domain/Core/Exceptions/invalid/PasswordContainsUsernameException';

export class ValidateUsernameNotInPassword extends ValidatorWithRepo<GetPasswordPolicyRepo, PasswordPolicyContextDTO> {
	public async validate(): Promise<void> {
		if (!this.input) return;

		const policy = await this.repository.getPasswordPolicy();

		if (!policy.disallowUsernameInPassword || !this.input.userName || this.input.userName.length < 3) return;

		if (this.input.password.toLowerCase().includes(this.input.userName.toLowerCase())) {
			throw new PasswordContainsUsernameException();
		}
	}
}
