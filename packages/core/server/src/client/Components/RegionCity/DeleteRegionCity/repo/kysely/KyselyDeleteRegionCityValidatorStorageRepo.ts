import {ValidateDeleteRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateDeleteRegionCityRepo';
import {RegionCityKyselyHelper} from '@copor/core/client/Components/RegionCity/repositoryHelper/RegionCityKyselyHelper';

export class KyselyDeleteRegionCityValidatorStorageRepo implements ValidateDeleteRegionCityRepo {
	isInvalidRegionCity(regionId: string | undefined): Promise<boolean> {
		return RegionCityKyselyHelper.isInvalidRegionCity(regionId);
	}
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return RegionCityKyselyHelper.hasRegionCityReferences(id);
	}
}