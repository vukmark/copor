import {ValidatorWithRepo} from './ValidatorWithRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordPolicyContextDTO} from '@copor/core/domain/Core/Validations/Validators/dto/PasswordPolicyContextDTO';
import {PasswordMissingDigitException} from '@copor/core/domain/Core/Exceptions/invalid/PasswordMissingDigitException';

export class ValidateMinDigitsInPassword extends ValidatorWithRepo<GetPasswordPolicyRepo, PasswordPolicyContextDTO> {
	public async validate(): Promise<void> {
		if (!this.input)
			return;

		const policy = await this.repository.getPasswordPolicy();
		const count = (this.input.password.match(/[0-9]/g) ?? []).length;

		if (count < policy.minDigits) {
			throw new PasswordMissingDigitException();
		}
	}
}
