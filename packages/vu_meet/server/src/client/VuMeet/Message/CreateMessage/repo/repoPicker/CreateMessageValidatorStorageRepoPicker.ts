import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateMessageValidatorStorageRepo} from '../fake/FakeCreateMessageValidatorStorageRepo';
import {ValidateCreateMessageRepo}
	from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateCreateMessageRepo';
import {KyselyCreateMessageValidatorStorageRepo}
	from '@copor/vu_meet/client/VuMeet/Message/CreateMessage/repo/kysely/KyselyCreateMessageValidatorStorageRepo';


export class CreateMessageValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateCreateMessageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	ValidateCreateMessageRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateMessageValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateMessageValidatorStorageRepo
		};
	}
}
