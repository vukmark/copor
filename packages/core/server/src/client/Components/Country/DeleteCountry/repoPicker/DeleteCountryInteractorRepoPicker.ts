import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FakeDeleteCountryInteractorRepo} from '../fakeRepo/FakeDeleteCountryInteractorRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyDeleteCountryInteractorRepo
} from '@copor/core/client/Components/Country/DeleteCountry/kysely/KyselyDeleteCountryInteractorRepo';

export class DeleteCountryInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteCountryInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteCountryInteractorRepo
		};
	}
}
