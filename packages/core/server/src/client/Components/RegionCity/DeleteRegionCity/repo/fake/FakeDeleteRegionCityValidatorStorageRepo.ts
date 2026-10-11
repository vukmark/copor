import {ValidateDeleteRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateDeleteRegionCityRepo';

export class FakeDeleteRegionCityValidatorStorageRepo implements ValidateDeleteRegionCityRepo {
	isInvalidRegionCity(regionId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
}