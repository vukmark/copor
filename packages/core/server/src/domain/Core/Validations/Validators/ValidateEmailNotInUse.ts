import {ValidatorWithRepo} from './ValidatorWithRepo';
import {IsEmailAlreadyInUseRepo} from '../../Repository/IsEmailAlreadyInUseRepo';
import {EmailAlreadyInUseException} from '../../Exceptions/invalid/EmailAlreadyInUseException';

export class ValidateEmailNotInUse extends ValidatorWithRepo<IsEmailAlreadyInUseRepo, string> {
	public async validate(): Promise<void> {
		if (await this.repository.isEmailAlreadyInUse(this.input!))
			throw new EmailAlreadyInUseException();
	}
}
