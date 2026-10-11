import {ValidateDeleteCountryRepo} from '@copor/core/domain/Components/Country/repository/ValidateDeleteCountryRepo';
import {CountryKyselyHelper} from '@copor/core/client/Components/Country/repositoryHelper/CountryKyselyHelper';

export class KyselyDeleteCountryValidatorStorageRepo implements ValidateDeleteCountryRepo {
	isInvalidCountry(id: string | undefined): Promise<boolean> {
		return CountryKyselyHelper.isInvalidCountry(id);
	}

	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return CountryKyselyHelper.countryHasReferences(id);
	}
}