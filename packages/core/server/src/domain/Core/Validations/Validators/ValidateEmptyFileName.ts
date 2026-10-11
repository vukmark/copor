import {ValidateRequiredString} from './ValidateRequiredString';
import {EmptyFileNameException} from '../../Exceptions/empty/EmptyFileNameException';

export class ValidateEmptyFileName extends ValidateRequiredString {
	getErrorException(): Error {
		return new EmptyFileNameException();
	}
}