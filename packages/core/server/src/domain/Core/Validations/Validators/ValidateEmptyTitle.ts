import {ValidateRequiredString} from './ValidateRequiredString';
import {EmptyTitleException} from '../../Exceptions/empty/EmptyTitleException';

export class ValidateEmptyTitle extends ValidateRequiredString {
	public getErrorException(): Error {
		return new EmptyTitleException();
	}
}