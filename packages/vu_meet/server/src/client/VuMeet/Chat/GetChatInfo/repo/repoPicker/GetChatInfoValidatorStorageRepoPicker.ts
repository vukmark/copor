import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetChatInfoValidatorStorageRepo} from '../fake/FakeGetChatInfoValidatorStorageRepo';
import {KyselyGetChatInfoValidatorStorageRepo} from '../kysely/KyselyGetChatInfoValidatorStorageRepo';
import {ValidateGetChatInfoRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateGetChatInfoRepo';

export class GetChatInfoValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetChatInfoRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateGetChatInfoRepo> {
		return {
			[DBEnv.FAKE]: FakeGetChatInfoValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetChatInfoValidatorStorageRepo
		};
	}
}
