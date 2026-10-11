import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveUserPreferencesRepo} from '@copor/core/domain/User/UserPreferences/repository/SaveUserPreferencesRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateUserPreferencesInteractorRepo} from '../fake/FakeUpdateUserPreferencesInteractorRepo';
import {
	KyselyUpdateUserPreferencesInteractorRepo
} from '@copor/core/client/User/UserPreferences/UpdateUserPreferences/repo/kysely/KyselyUpdateUserPreferencesInteractorRepo';

export class UpdateUserPreferencesInteractorRepoPicker extends NewRepositoryPicker<SaveUserPreferencesRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveUserPreferencesRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserPreferencesInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateUserPreferencesInteractorRepo
		};
	}
}
