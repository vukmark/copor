import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {
	ValidateSearchMessagesInChatRepo
} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateSearchMessagesInChatRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeSearchMessagesInChatValidatorStorageRepo
} from '../fake/FakeSearchMessagesInChatValidatorStorageRepo';
import {
	KyselySearchMessagesInChatValidatorStorageRepo
} from '@copor/vu_meet/client/VuMeet/Message/SearchMessagesInChat/repo/kysely/KyselySearchMessagesInChatValidatorStorageRepo';

export class SearchMessagesInChatValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateSearchMessagesInChatRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	ValidateSearchMessagesInChatRepo> {
		return {
			[DBEnv.FAKE]: FakeSearchMessagesInChatValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselySearchMessagesInChatValidatorStorageRepo
		};
	}
}
