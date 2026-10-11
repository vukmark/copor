import {ValidateRequiredString} from '@copor/core/domain/Core/Validations/Validators/ValidateRequiredString';
import {EmptyQuestionException} from '@copor/core/domain/Core/Exceptions/empty/EmptyQuestionException';

export class ValidateEmptyAnswer extends ValidateRequiredString {
	getErrorException(): Error {
		return new EmptyQuestionException();
	}
}