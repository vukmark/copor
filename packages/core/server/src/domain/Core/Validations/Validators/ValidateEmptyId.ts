import {ValidateRequiredString} from './ValidateRequiredString';
import {EmptyIdException} from '../../Exceptions/empty/EmptyIdException';

export class ValidateEmptyId extends ValidateRequiredString {
	public getErrorException(): Error {
		return new EmptyIdException();
	}
}