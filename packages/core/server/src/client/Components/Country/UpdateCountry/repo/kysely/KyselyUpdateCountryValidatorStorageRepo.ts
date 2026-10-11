import {ValidateUpdateCountryRepo} from '@copor/core/domain/Components/Country/repository/ValidateUpdateCountryRepo';
import {CountryKyselyHelper} from '@copor/core/client/Components/Country/repositoryHelper/CountryKyselyHelper';

export class KyselyUpdateCountryValidatorStorageRepo implements ValidateUpdateCountryRepo {
	public isInvalidCountry(countryId: string): Promise<boolean> {
		return CountryKyselyHelper.isInvalidCountry(countryId);
	}
}
