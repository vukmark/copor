import {ValidateUpdateRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateUpdateRegionCityRepo';

export class FakeUpdateRegionCityValidatorRepo implements ValidateUpdateRegionCityRepo {
	isInvalidRegionCity(regionId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidRegion(regionId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}