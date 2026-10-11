import {ValidateUpdateRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateUpdateRegionRepo';

export class FakeUpdateRegionValidatorStorageRepo implements ValidateUpdateRegionRepo {
	isInvalidRegion(regionId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidCountry(countryId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidState(stateId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
