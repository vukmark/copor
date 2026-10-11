import {ValidatorWithRepo} from './ValidatorWithRepo';
import {IsInvalidStateRepo} from '../../../Components/State/repository/IsInvalidStateRepo';
import {InvalidStateException} from '../../Exceptions/invalid/InvalidStateException';

export class ValidateState extends ValidatorWithRepo<IsInvalidStateRepo, string | undefined> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidState(this.input))
			throw new InvalidStateException();
	}
}
