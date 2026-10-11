import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateDeleteCountryRepo}
	from '@copor/core/domain/Components/Country/repository/ValidateDeleteCountryRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FakeDeleteCountryValidatorStorageRepo} from '../fakeRepo/FakeDeleteCountryValidatorStorageRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyDeleteCountryValidatorStorageRepo}
	from '@copor/core/client/Components/Country/DeleteCountry/kysely/KyselyDeleteCountryValidatorStorageRepo';

export class DeleteCountryValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateDeleteCountryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteCountryRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteCountryValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteCountryValidatorStorageRepo
		};
	}
}