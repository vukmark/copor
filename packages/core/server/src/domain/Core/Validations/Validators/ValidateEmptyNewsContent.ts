import {ValidateRequiredString} from '@copor/core/domain/Core/Validations/Validators/ValidateRequiredString';
import {EmptyNewsContentException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNewsContentException';

export class ValidateEmptyNewsContent extends ValidateRequiredString {
	getErrorException(): Error {
		return new EmptyNewsContentException();
	}
}