import {ValidateUpdateRegionRepo}
	from '@copor/core/domain/Components/Region/repository/ValidateUpdateRegionRepo';
import {CountryKyselyHelper} from '@copor/core/client/Components/Country/repositoryHelper/CountryKyselyHelper';
import {StateKyselyHelper} from '@copor/core/client/Components/State/repositoryHelper/StateKyselyHelper';
import {RegionKyselyHelper} from '@copor/core/client/Components/Region/repositoryHelper/RegionKyselyHelper';

export class KyselyUpdateRegionValidatorStorageRepo implements ValidateUpdateRegionRepo {
	isInvalidRegion(regionId: string | undefined): Promise<boolean> {
		return RegionKyselyHelper.isInvalidRegion(regionId);
	}
	isInvalidCountry(countryId: string | undefined): Promise<boolean> {
		return CountryKyselyHelper.isInvalidCountry(countryId);
	}
	isInvalidState(stateId: string | undefined): Promise<boolean> {
		return StateKyselyHelper.isInvalidState(stateId);
	}
}

