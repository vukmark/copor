import {ValidateDeleteRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateDeleteRegionRepo';
import {RegionKyselyHelper} from '@copor/core/client/Components/Region/repositoryHelper/RegionKyselyHelper';
import {StateKyselyHelper} from '@copor/core/client/Components/State/repositoryHelper/StateKyselyHelper';

export class KyselyDeleteRegionValidatorStorageRepo implements ValidateDeleteRegionRepo {
	isInvalidRegion(regionId: string | undefined): Promise<boolean> {
		return RegionKyselyHelper.isInvalidRegion(regionId);
	}
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return RegionKyselyHelper.hasRegionReferences(id);
	}
}