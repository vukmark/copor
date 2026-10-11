import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateGetMessageListRepo}
	from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateGetMessageListRepo';
import {FakeGetMessageListValidatorStorageRepo}
	from '../fake/FakeGetMessageListValidatorStorageRepo';
import {KyselyGetMessageListValidatorStorageRepo}
	from '@copor/vu_meet/client/VuMeet/Message/GetMessageList/repo/kysely/KyselyGetMessageListValidatorStorageRepo';

export class GetMessageListValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateGetMessageListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	ValidateGetMessageListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetMessageListValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeGetMessageListValidatorStorageRepo,
		};
	}
}
