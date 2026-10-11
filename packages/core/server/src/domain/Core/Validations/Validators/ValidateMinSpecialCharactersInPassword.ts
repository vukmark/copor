import {ValidatorWithRepo} from './ValidatorWithRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordPolicyContextDTO} from '@copor/core/domain/Core/Validations/Validators/dto/PasswordPolicyContextDTO';
import {
	PasswordMissingSpecialCharacterException
} from '@copor/core/domain/Core/Exceptions/invalid/PasswordMissingSpecialCharacterException';

export class ValidateMinSpecialCharactersInPassword
	extends ValidatorWithRepo<GetPasswordPolicyRepo, PasswordPolicyContextDTO> {
	public async validate(): Promise<void> {
		if (!this.input)
			return;

		const policy = await this.repository.getPasswordPolicy();
		const count = (this.input.password.match(/[^a-zA-Z0-9\s]/g) ?? []).length;

		if (count < policy.minSpecialCharacters) {
			throw new PasswordMissingSpecialCharacterException();
		}
	}
}
