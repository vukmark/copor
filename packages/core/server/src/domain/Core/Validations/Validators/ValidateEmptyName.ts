import {ValidateRequiredString} from './ValidateRequiredString';
import {EmptyNameException} from '../../Exceptions/empty/EmptyNameException';

export class ValidateEmptyName extends ValidateRequiredString {
	getErrorException(): Error {
		return new EmptyNameException();
	}
}
