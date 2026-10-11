import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/GetUserPreferencesDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserPreferencesInteractorRepo} from '../fake/FakeGetUserPreferencesInteractorRepo';
import {
	KyselyGetUserPreferencesInteractorRepo
} from '@copor/core/client/User/UserPreferences/GetUserPreferences/repo/kysely/KyselyGetUserPreferencesInteractorRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class GetUserPreferencesInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetUserPreferencesDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetItem<GetUserPreferencesDTO>> {
		return {
			[DBEnv.KYSELY]: KyselyGetUserPreferencesInteractorRepo,
			[DBEnv.FAKE]: FakeGetUserPreferencesInteractorRepo
		};
	}
}
