import {ValidateCreateStateRepo} from '@copor/core/domain/Components/State/repository/ValidateCreateStateRepo';
import {CountryKyselyHelper} from '@copor/core/client/Components/Country/repositoryHelper/CountryKyselyHelper';

export class KyselyCreateStateValidatorStorageRepo implements ValidateCreateStateRepo {
	isInvalidCountry(countryId: string | undefined): Promise<boolean> {
		return CountryKyselyHelper.isInvalidCountry(countryId);
	}
}