import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {VerifyRegistrationRepo} from '@copor/core/domain/Registration/repository/VerifyRegistrationRepo';
import {FakeVerifyRegistrationRepo} from '../fake/FakeRegistrationRepos';
import {KyselyVerifyRegistrationRepo} from '../kysely/KyselyVerifyRegistrationRepo';

export class VerifyRegistrationRepoPicker extends NewRepositoryPicker<VerifyRegistrationRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => VerifyRegistrationRepo> {
		return {
			[DBEnv.FAKE]: FakeVerifyRegistrationRepo,
			[DBEnv.KYSELY]: KyselyVerifyRegistrationRepo
		};
	}
}
