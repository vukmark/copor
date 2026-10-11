import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/SaveCountryDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateCountryInteractorRepo} from '../fake/FakeCreateCountryInteractorRepo';
import {
    KyselyCreateCountryInteractorRepo
} from '@copor/core/client/Components/Country/CreateCountry/repo/kysely/KyselyCreateCountryInteractorRepo';

export class CreateCountryInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveCountryDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveCountryDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateCountryInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateCountryInteractorRepo
		};
	}
}
