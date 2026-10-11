import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ResendRegistrationCodeRepo} from '@copor/core/domain/Registration/repository/ResendRegistrationCodeRepo';
import {FakeResendRegistrationCodeRepo} from '../fake/FakeRegistrationRepos';
import {KyselyResendRegistrationCodeRepo} from '../kysely/KyselyResendRegistrationCodeRepo';

export class ResendRegistrationCodeRepoPicker extends NewRepositoryPicker<ResendRegistrationCodeRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ResendRegistrationCodeRepo> {
		return {
			[DBEnv.FAKE]: FakeResendRegistrationCodeRepo,
			[DBEnv.KYSELY]: KyselyResendRegistrationCodeRepo
		};
	}
}
