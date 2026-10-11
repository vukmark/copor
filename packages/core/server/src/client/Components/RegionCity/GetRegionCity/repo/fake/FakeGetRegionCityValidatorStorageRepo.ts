import {ValidateGetRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateGetRegionCityRepo';

export class FakeGetRegionCityValidatorStorageRepo implements ValidateGetRegionCityRepo {
	isInvalidRegionCity(regionId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}