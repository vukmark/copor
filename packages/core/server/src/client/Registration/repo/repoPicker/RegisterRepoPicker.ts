import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {RegisterRepo} from '@copor/core/domain/Registration/repository/RegisterRepo';
import {FakeRegisterRepo} from '../fake/FakeRegistrationRepos';
import {KyselyRegisterRepo} from '../kysely/KyselyRegisterRepo';

export class RegisterRepoPicker extends NewRepositoryPicker<RegisterRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => RegisterRepo> {
		return {
			[DBEnv.FAKE]: FakeRegisterRepo,
			[DBEnv.KYSELY]: KyselyRegisterRepo
		};
	}
}
