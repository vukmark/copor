import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveCountryRepo} from '@copor/core/domain/Components/Country/repository/SaveCountryRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateCountryInteractorRepo} from '../fake/FakeUpdateCountryInteractorRepo';
import {
	KyselyUpdateCountryInteractorRepo
} from '@copor/core/client/Components/Country/UpdateCountry/repo/kysely/KyselyUpdateCountryInteractorRepo';

export class UpdateCountryInteractorRepoPicker extends NewRepositoryPicker<SaveCountryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveCountryRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateCountryInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateCountryInteractorRepo
		};
	}
}
