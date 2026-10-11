import {ValidateRequiredString} from './ValidateRequiredString';
import {EmptyPostalCodeException} from '../../Exceptions/empty/EmptyPostalCodeException';

export class ValidatePostalCode extends ValidateRequiredString {
	public getErrorException(): Error {
		return new EmptyPostalCodeException();
	}
}
