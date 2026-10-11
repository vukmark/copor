import {ValidateGetRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateGetRegionRepo';

export class FakeGetRegionValidatorStorageRepo implements ValidateGetRegionRepo {
	isInvalidRegion(regionId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
