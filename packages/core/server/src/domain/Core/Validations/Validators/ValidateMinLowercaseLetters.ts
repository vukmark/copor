import {ValidatorWithRepo} from './ValidatorWithRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordPolicyContextDTO} from '@copor/core/domain/Core/Validations/Validators/dto/PasswordPolicyContextDTO';
import {PasswordMissingLowercaseException} from '@copor/core/domain/Core/Exceptions/invalid/PasswordMissingLowercaseException';

export class ValidateMinLowercaseLetters extends ValidatorWithRepo<GetPasswordPolicyRepo, PasswordPolicyContextDTO> {
	public async validate(): Promise<void> {
		if (!this.input)
			return;

		const policy = await this.repository.getPasswordPolicy();
		const count = (this.input.password.match(/[a-z]/g) ?? []).length;

		if (count < policy.minLowercaseLetters) {
			throw new PasswordMissingLowercaseException();
		}
	}
}
