import {ValidateCreateRegionRepo}
	from '@copor/core/domain/Components/Region/repository/ValidateCreateRegionRepo';

export class FakeCreateRegionValidatorStorageRepo implements ValidateCreateRegionRepo {
	isInvalidCountry(countryId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidState(stateId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
