import {ValidateRequiredString} from './ValidateRequiredString';
import {EmptyAddressException} from '../../global/ContactDetails/exceptions/EmptyAddressException';

export class ValidateEmptyAddress extends ValidateRequiredString {
	getErrorException(): Error {
		return new EmptyAddressException();
	}
}