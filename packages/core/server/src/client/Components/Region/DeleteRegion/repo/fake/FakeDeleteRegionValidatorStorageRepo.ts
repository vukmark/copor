import {ValidateDeleteRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateDeleteRegionRepo';

export class FakeDeleteRegionValidatorStorageRepo implements ValidateDeleteRegionRepo {
	isInvalidRegion(regionId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
	entityHasReferences(value: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
}