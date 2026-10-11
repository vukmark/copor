import {ValidationWithRepo} from '@copor/core/domain/Core/Validations/ValidationWithRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateRegisterDTO} from '@copor/core/domain/Registration/validations/dto/ValidateRegisterDTO';
import {ValidateRegisterRepo} from '@copor/core/domain/Registration/repository/ValidateRegisterRepo';
import {ValidateSelfRegistrationEnabled} from '@copor/core/domain/Registration/validations/validator/ValidateSelfRegistrationEnabled';
import {ValidateFirstName} from '@copor/core/domain/Core/Validations/Validators/ValidateFirstName';
import {ValidateLastName} from '@copor/core/domain/Core/Validations/Validators/ValidateLastName';
import {ValidateEmailAddress} from '@copor/core/domain/Core/Validations/Validators/ValidateEmailAddress';
import {ValidateEmailNotInUse} from '@copor/core/domain/Core/Validations/Validators/ValidateEmailNotInUse';
import {ValidateNewUsername} from '@copor/core/domain/Registration/validations/validator/ValidateNewUsername';
import {getPasswordPolicyValidators} from '@copor/core/domain/Core/Validations/Validators/PasswordPolicyValidatorSet';

export class ValidateRegister extends ValidationWithRepo<ValidateRegisterDTO, ValidateRegisterRepo> {
	// With registration off, report only that: field errors such as "email in use"
	// would let anyone probe accounts on an instance that doesn't accept signups.
	public async validate(): Promise<void | ErrorList> {
		const enabledError = await new ValidateSelfRegistrationEnabled(this.storageRepo).validate()
			.then(() => undefined, (error: Error) => error);

		if (enabledError)
			return new ErrorList([enabledError]);

		return super.validate();
	}

	public getValidators(): Validator[] {
		const {firstName, lastName, email, userName, password} = this.input;

		return [
			new ValidateFirstName(firstName),
			new ValidateLastName(lastName),
			new ValidateEmailAddress(email ?? ''),
			new ValidateEmailNotInUse(this.storageRepo, email),
			new ValidateNewUsername(this.storageRepo, userName),
			... getPasswordPolicyValidators(this.storageRepo, {password, userName, email, firstName, lastName})
		];
	}
}
