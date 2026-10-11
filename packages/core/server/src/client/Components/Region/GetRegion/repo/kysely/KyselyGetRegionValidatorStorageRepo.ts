import {ValidateGetRegionRepo}
	from '@copor/core/domain/Components/Region/repository/ValidateGetRegionRepo';
import {RegionKyselyHelper} from '@copor/core/client/Components/Region/repositoryHelper/RegionKyselyHelper';

export class KyselyGetRegionValidatorStorageRepo implements ValidateGetRegionRepo {
	public isInvalidRegion(regionId: string): Promise<boolean> {
		return RegionKyselyHelper.isInvalidRegion(regionId);
	}
}