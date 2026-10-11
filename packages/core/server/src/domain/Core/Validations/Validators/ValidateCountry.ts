import {ValidatorWithRepo} from './ValidatorWithRepo';
import {InvalidCountryException} from '../../Exceptions/invalid/InvalidCountryException';
import {IsInvalidCountryRepo} from '@copor/core/domain/Components/Country/repository/IsInvalidCountryRepo';

export class ValidateCountry extends ValidatorWithRepo<IsInvalidCountryRepo, string | undefined> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidCountry(this.input))
			throw new InvalidCountryException();
	}
}