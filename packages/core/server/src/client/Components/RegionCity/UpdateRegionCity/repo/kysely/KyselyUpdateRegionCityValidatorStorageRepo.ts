import {ValidateUpdateRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateUpdateRegionCityRepo';
import {RegionCityKyselyHelper} from '@copor/core/client/Components/RegionCity/repositoryHelper/RegionCityKyselyHelper';
import {RegionKyselyHelper} from '@copor/core/client/Components/Region/repositoryHelper/RegionKyselyHelper';

export class KyselyUpdateRegionCityValidatorStorageRepo implements ValidateUpdateRegionCityRepo {
	isInvalidRegionCity(regionId: string | undefined): Promise<boolean> {
		return RegionCityKyselyHelper.isInvalidRegionCity(regionId);
	}
	isInvalidRegion(regionId: string | undefined): Promise<boolean> {
		return RegionKyselyHelper.isInvalidRegion(regionId);
	}
}