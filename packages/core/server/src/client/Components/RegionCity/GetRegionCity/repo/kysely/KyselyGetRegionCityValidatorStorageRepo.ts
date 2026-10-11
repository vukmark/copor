import {ValidateGetRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateGetRegionCityRepo';
import {RegionCityKyselyHelper} from '@copor/core/client/Components/RegionCity/repositoryHelper/RegionCityKyselyHelper';

export class KyselyGetRegionCityValidatorStorageRepo implements ValidateGetRegionCityRepo {
	public isInvalidRegionCity(regionId: string | undefined): Promise<boolean> {
		return RegionCityKyselyHelper.isInvalidRegionCity(regionId);
	}
}