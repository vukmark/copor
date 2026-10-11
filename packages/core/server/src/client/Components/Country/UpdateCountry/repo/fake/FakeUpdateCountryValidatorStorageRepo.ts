import {ValidateUpdateCountryRepo} from '@copor/core/domain/Components/Country/repository/ValidateUpdateCountryRepo';

export class FakeUpdateCountryValidatorStorageRepo implements ValidateUpdateCountryRepo {
	public isInvalidCountry(countryId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
