import {ValidateCreateRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateCreateRegionCityRepo';

export class FakeCreateRegionCityValidatorStorageRepo implements ValidateCreateRegionCityRepo {
	isInvalidRegion(regionId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}