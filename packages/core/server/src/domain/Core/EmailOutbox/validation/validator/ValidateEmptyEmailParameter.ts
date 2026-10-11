import {ValidateRequiredString} from '@copor/core/domain/Core/Validations/Validators/ValidateRequiredString';

import {MissingEmailParameterException} from '@copor/core/domain/Core/EmailOutbox/exception/MissingEmailParameterException';

export class ValidateEmptyEmailParameter extends ValidateRequiredString {
	getErrorException(): Error {
		return new MissingEmailParameterException();
	}
}