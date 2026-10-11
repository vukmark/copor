import {ValidateCreateRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateCreateRegionRepo';
import {CountryKyselyHelper} from '@copor/core/client/Components/Country/repositoryHelper/CountryKyselyHelper';
import {StateKyselyHelper} from '@copor/core/client/Components/State/repositoryHelper/StateKyselyHelper';

export class KyselyCreateRegionValidatorStorageRepo implements ValidateCreateRegionRepo {
	isInvalidCountry(countryId: string | undefined): Promise<boolean> {
		return CountryKyselyHelper.isInvalidCountry(countryId);
	}
	isInvalidState(stateId: string | undefined): Promise<boolean> {
		return StateKyselyHelper.isInvalidState(stateId);
	}
}
