import {Validation} from '@copor/core/domain/Core/Validations/Validation';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {RegistrationStatusRepo} from '@copor/core/domain/Registration/repository/RegistrationStatusRepo';
import {ValidateSelfRegistrationEnabled} from '@copor/core/domain/Registration/validations/validator/ValidateSelfRegistrationEnabled';

export class ValidateResendRegistrationCode extends Validation<RegistrationStatusRepo> {
	public getValidators(): Validator[] {
		return [new ValidateSelfRegistrationEnabled(this.input)];
	}
}
