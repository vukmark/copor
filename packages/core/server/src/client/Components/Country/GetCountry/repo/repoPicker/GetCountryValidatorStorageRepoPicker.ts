import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetCountryRepo} from '@copor/core/domain/Components/Country/repository/ValidateGetCountryRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetCountryValidatorStorageRepo} from '../fake/FakeGetCountryValidatorStorageRepo';
import {KyselyGetCountryValidatorStorageRepo}
	from '@copor/core/client/Components/Country/GetCountry/repo/kysely/KyselyGetCountryValidatorStorageRepo';

export class GetCountryValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetCountryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateGetCountryRepo> {
		return {
			[DBEnv.FAKE]: FakeGetCountryValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetCountryValidatorStorageRepo
		};
	}
}
