import {ValidatorWithRepo} from './ValidatorWithRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordPolicyContextDTO} from '@copor/core/domain/Core/Validations/Validators/dto/PasswordPolicyContextDTO';
import {PasswordContainsSpaceException} from '@copor/core/domain/Core/Exceptions/invalid/PasswordContainsSpaceException';

export class ValidateNoSpacesInPassword extends ValidatorWithRepo<GetPasswordPolicyRepo, PasswordPolicyContextDTO> {
	public async validate(): Promise<void> {
		if (!this.input)
			return;

		const policy = await this.repository.getPasswordPolicy();

		if (!policy.allowSpaces && /\s/.test(this.input.password)) {
			throw new PasswordContainsSpaceException();
		}
	}
}
