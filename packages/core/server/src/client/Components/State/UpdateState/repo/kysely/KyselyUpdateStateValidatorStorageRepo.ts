import {ValidateUpdateStateRepo} from '@copor/core/domain/Components/State/repository/ValidateUpdateStateRepo';
import {StateKyselyHelper} from '@copor/core/client/Components/State/repositoryHelper/StateKyselyHelper';
import {CountryKyselyHelper} from '@copor/core/client/Components/Country/repositoryHelper/CountryKyselyHelper';

export class KyselyUpdateStateValidatorStorageRepo implements ValidateUpdateStateRepo {
	isInvalidState(stateId: string | undefined): Promise<boolean> {
		return StateKyselyHelper.isInvalidState(stateId);
	}
	isInvalidCountry(countryId: string | undefined): Promise<boolean> {
		return CountryKyselyHelper.isInvalidCountry(countryId);
	}
}