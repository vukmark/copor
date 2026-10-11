import {ValidatorWithRepo} from './ValidatorWithRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {PasswordPolicyContextDTO} from '@copor/core/domain/Core/Validations/Validators/dto/PasswordPolicyContextDTO';
import {
	PasswordContainsEmailOrNameException
} from '@copor/core/domain/Core/Exceptions/invalid/PasswordContainsEmailOrNameException';

export class ValidateEmailOrNameNotInPassword
	extends ValidatorWithRepo<GetPasswordPolicyRepo, PasswordPolicyContextDTO> {
	public async validate(): Promise<void> {
		if (!this.input)
			return;

		const policy = await this.repository.getPasswordPolicy();

		if (!policy.disallowEmailOrNameInPassword)
			return;

		const emailLocalPart = this.input.email?.split('@')[0];
		const candidates = [emailLocalPart, this.input.firstName, this.input.lastName]
			.filter((value): value is string => Boolean(value) && value!.length >= 3);

		const passwordLower = this.input.password.toLowerCase();

		if (candidates.some((candidate) => passwordLower.includes(candidate.toLowerCase()))) {
			throw new PasswordContainsEmailOrNameException();
		}
	}
}
