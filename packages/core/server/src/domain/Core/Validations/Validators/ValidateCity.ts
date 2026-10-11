import {ValidateRequiredString} from './ValidateRequiredString';
import {EmptyCityException} from '../../Exceptions/empty/EmptyCityException';

export class ValidateCity extends ValidateRequiredString {
	public getErrorException(): Error {
		return new EmptyCityException();
	}
}
