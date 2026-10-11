import {ValidateDeleteCountryRepo} from '@copor/core/domain/Components/Country/repository/ValidateDeleteCountryRepo';

export class FakeDeleteCountryValidatorStorageRepo implements ValidateDeleteCountryRepo {
	entityHasReferences(value: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
	isInvalidCountry(countryId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}