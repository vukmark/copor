import {ValidateGetCountryRepo} from '@copor/core/domain/Components/Country/repository/ValidateGetCountryRepo';
import {CountryKyselyHelper} from '@copor/core/client/Components/Country/repositoryHelper/CountryKyselyHelper';

export class KyselyGetCountryValidatorStorageRepo implements ValidateGetCountryRepo {
	public isInvalidCountry(countryId: string): Promise<boolean> {
		return CountryKyselyHelper.isInvalidCountry(countryId);
	}
}
