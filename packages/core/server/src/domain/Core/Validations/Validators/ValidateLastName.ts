import {ValidateRequiredString} from './ValidateRequiredString';
import {InvalidLastNameException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidLastNameException';

export class ValidateLastName extends ValidateRequiredString {
	public getErrorException(): Error {
		return new InvalidLastNameException();
	}
}