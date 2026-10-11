import {ValidateRequiredString} from './ValidateRequiredString';
import {InvalidFirstNameException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidFirstNameException';

export class ValidateFirstName extends ValidateRequiredString {
	public getErrorException(): Error {
		return new InvalidFirstNameException();
	}
}
