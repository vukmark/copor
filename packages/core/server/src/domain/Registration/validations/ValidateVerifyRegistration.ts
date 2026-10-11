import {ValidationWithRepo} from '@copor/core/domain/Core/Validations/ValidationWithRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {VerifyRegistrationDTO} from '@copor/core/domain/Registration/interactor/dto/VerifyRegistrationDTO';
import {ValidateVerifyRegistrationRepo} from '@copor/core/domain/Registration/repository/ValidateVerifyRegistrationRepo';
import {ValidateSelfRegistrationEnabled} from '@copor/core/domain/Registration/validations/validator/ValidateSelfRegistrationEnabled';
import {
	ValidateRegistrationVerificationCode
} from '@copor/core/domain/Registration/validations/validator/ValidateRegistrationVerificationCode';

export class ValidateVerifyRegistration extends ValidationWithRepo<VerifyRegistrationDTO, ValidateVerifyRegistrationRepo> {
	// Checked first and alone: a wrong code must not count as a failed attempt
	// while registration is switched off.
	public async validate(): Promise<void | ErrorList> {
		const enabledError = await new ValidateSelfRegistrationEnabled(this.storageRepo).validate()
			.then(() => undefined, (error: Error) => error);

		if (enabledError)
			return new ErrorList([enabledError]);

		return super.validate();
	}

	public getValidators(): Validator[] {
		return [new ValidateRegistrationVerificationCode(this.storageRepo, this.input)];
	}
}
