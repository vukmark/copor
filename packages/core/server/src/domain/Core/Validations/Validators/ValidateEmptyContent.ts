import {ValidateRequiredString} from './ValidateRequiredString';
import {EmptyContentException} from '../../Exceptions/EmptyContentException';

export class ValidateEmptyContent extends ValidateRequiredString {
	getErrorException(): Error {
		return new EmptyContentException();
	}
}
