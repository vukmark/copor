import {ValidatorWithRepo} from './ValidatorWithRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordPolicyContextDTO} from '@copor/core/domain/Core/Validations/Validators/dto/PasswordPolicyContextDTO';
import {PasswordMissingUppercaseException} from '@copor/core/domain/Core/Exceptions/invalid/PasswordMissingUppercaseException';

export class ValidateMinUppercaseLetters extends ValidatorWithRepo<GetPasswordPolicyRepo, PasswordPolicyContextDTO> {
	public async validate(): Promise<void> {
		if (!this.input)
			return;

		const policy = await this.repository.getPasswordPolicy();
		const count = (this.input.password.match(/[A-Z]/g) ?? []).length;

		if (count < policy.minUppercaseLetters) {
			throw new PasswordMissingUppercaseException();
		}
	}
}
