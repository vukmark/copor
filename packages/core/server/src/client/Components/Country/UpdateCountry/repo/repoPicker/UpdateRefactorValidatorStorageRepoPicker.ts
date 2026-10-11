import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateUpdateCountryRepo} from '@copor/core/domain/Components/Country/repository/ValidateUpdateCountryRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateCountryValidatorStorageRepo} from '../fake/FakeUpdateCountryValidatorStorageRepo';
import {KyselyUpdateCountryValidatorStorageRepo}
	from '@copor/core/client/Components/Country/UpdateCountry/repo/kysely/KyselyUpdateCountryValidatorStorageRepo';

export class UpdateCountryValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateCountryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateCountryRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateCountryValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateCountryValidatorStorageRepo
		};
	}
}
