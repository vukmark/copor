import {ValidatorWithRepo} from './ValidatorWithRepo';
import {IsInvalidPhoneNumberRepo} from '../../global/PhoneNumber/repository/IsInvalidPhoneNumberRepo';
import {InvalidPhoneNumberException} from '../../Exceptions/invalid/InvalidPhoneNumberException';

export class ValidatePhoneNumber extends ValidatorWithRepo<IsInvalidPhoneNumberRepo, string | undefined> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidPhoneNumber(this.input))
			throw new InvalidPhoneNumberException();
	}
}