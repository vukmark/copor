import {ValidateCreateRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateCreateRegionCityRepo';
import {RegionKyselyHelper} from '@copor/core/client/Components/Region/repositoryHelper/RegionKyselyHelper';

export class KyselyCreateRegionCityValidatorStorageRepo implements ValidateCreateRegionCityRepo {
	isInvalidRegion(regionId: string | undefined): Promise<boolean> {
		return RegionKyselyHelper.isInvalidRegion(regionId);
	}
}