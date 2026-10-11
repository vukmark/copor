import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeSearchMessagesInChatInteractorRepo
} from '../fake/FakeSearchMessagesInChatInteractorRepo';
import {
	SearchMessagesInChatRepo
} from '@copor/vu_meet/domain/VuMeet/Message/repository/SearchMessagesInChatRepo';
import {
	KyselySearchMessagesInChatInteractorRepo
} from '@copor/vu_meet/client/VuMeet/Message/SearchMessagesInChat/repo/kysely/KyselySearchMessagesInChatInteractorRepo';

export class SearchMessagesInChatInteractorRepoPicker
	extends NewRepositoryPicker<SearchMessagesInChatRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SearchMessagesInChatRepo> {
		return {
			[DBEnv.FAKE]: FakeSearchMessagesInChatInteractorRepo,
			[DBEnv.KYSELY]: KyselySearchMessagesInChatInteractorRepo
		};
	}
}
