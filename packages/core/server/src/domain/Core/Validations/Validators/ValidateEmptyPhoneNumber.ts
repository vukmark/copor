import {ValidateRequiredString} from './ValidateRequiredString';
import {EmptyPhoneNumberException} from '../../Exceptions/empty/EmptyPhoneNumberException';

export class ValidateEmptyPhoneNumber extends ValidateRequiredString {
	getErrorException(): Error {
		return new EmptyPhoneNumberException();
	}
}