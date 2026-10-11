import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidatePasswordInputDTO} from '@copor/core/domain/User/validation/dto/ValidatePasswordInputDTO';
import {ValidatePasswordMatch} from '@copor/core/domain/Core/Validations/Validators/ValidatePasswordMatch';
import {ValidationWithRepo} from '@copor/core/domain/Core/Validations/ValidationWithRepo';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {getPasswordPolicyValidators} from '@copor/core/domain/Core/Validations/Validators/PasswordPolicyValidatorSet';

export class ValidatePasswordInput extends ValidationWithRepo<ValidatePasswordInputDTO, GetPasswordPolicyRepo> {
	public getValidators(): Validator[] {
		const {password, confirmPassword, userName, email, firstName, lastName} = this.input;

		return [
			new ValidatePasswordMatch({
				password,
				confirmPassword
			}),
			... getPasswordPolicyValidators(this.storageRepo, {password, userName, email, firstName, lastName})
		];
	}
}
