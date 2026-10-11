import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {RegistrationStatusRepo} from '@copor/core/domain/Registration/repository/RegistrationStatusRepo';
import {FakeRegistrationStatusRepo} from '../fake/FakeRegistrationRepos';
import {KyselyRegistrationStatusRepo} from '../kysely/KyselyRegistrationStatusRepo';

export class RegistrationStatusRepoPicker extends NewRepositoryPicker<RegistrationStatusRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => RegistrationStatusRepo> {
		return {
			[DBEnv.FAKE]: FakeRegistrationStatusRepo,
			[DBEnv.KYSELY]: KyselyRegistrationStatusRepo
		};
	}
}
