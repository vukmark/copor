import {ValidateGetCountryRepo} from '@copor/core/domain/Components/Country/repository/ValidateGetCountryRepo';

export class FakeGetCountryValidatorStorageRepo implements ValidateGetCountryRepo {
	isInvalidCountry(countryId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
