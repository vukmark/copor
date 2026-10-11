import {ValidateRequiredString} from './ValidateRequiredString';
import {EmptyNotificationTokenException} from '../../Exceptions/empty/EmptyNotificationTokenException';

export class EmptyTokenValidator extends ValidateRequiredString {
	getErrorException(): Error {
		return new EmptyNotificationTokenException();
	}
}
