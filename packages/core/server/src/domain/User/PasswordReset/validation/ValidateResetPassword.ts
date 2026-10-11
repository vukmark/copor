import {ValidationWithRepo} from '@copor/core/domain/Core/Validations/ValidationWithRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateResetPasswordDTO} from '@copor/core/domain/User/PasswordReset/validation/dto/ValidateResetPasswordDTO';
import {ValidateResetPasswordRepo} from '@copor/core/domain/User/PasswordReset/repository/ValidateResetPasswordRepo';
import {getPasswordPolicyValidators} from '@copor/core/domain/Core/Validations/Validators/PasswordPolicyValidatorSet';
import {ValidatePasswordNotRecentlyUsed} from '@copor/core/domain/Core/Validations/Validators/ValidatePasswordNotRecentlyUsed';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

export class ValidateResetPassword extends ValidationWithRepo<ValidateResetPasswordDTO, ValidateResetPasswordRepo> {
	private authUserId?: string;

	public async validate(): Promise<void | ErrorList> {
		this.authUserId = await this.storageRepo.getAuthUserId(this.input.userName);

		return super.validate();
	}

	public getValidators(): Validator[] {
		return [
			... getPasswordPolicyValidators(this.storageRepo, {
				password: this.input.password,
				userName: this.input.userName,
				email: this.input.userName
			}),
			new ValidatePasswordNotRecentlyUsed(this.storageRepo, this.authUserId ? {
				authUserId: this.authUserId,
				password: this.input.password
			} : undefined)
		];
	}
}
