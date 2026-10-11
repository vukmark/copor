import {ValidateRequiredString} from './ValidateRequiredString';
import {EmptyCodeException} from '../../Exceptions/empty/EmptyCodeException';

export class ValidateEmptyCode extends ValidateRequiredString {
	getErrorException(): Error {
		return new EmptyCodeException();
	}
}
