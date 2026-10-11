import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateUpdateUserPreferencesRepo}
	from '@copor/core/domain/User/UserPreferences/repository/ValidateUpdateUserPreferencesRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateUserPreferencesValidatorStorageRepo} from '../fake/FakeUpdateUserPreferencesValidatorStorageRepo';

export class UpdateUserPreferencesValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateUserPreferencesRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateUserPreferencesRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserPreferencesValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeUpdateUserPreferencesValidatorStorageRepo
		};
	}
}
