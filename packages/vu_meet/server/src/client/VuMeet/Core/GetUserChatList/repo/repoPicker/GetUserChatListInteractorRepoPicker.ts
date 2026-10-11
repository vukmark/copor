import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {GetUserChatListRepo} from '@copor/vu_meet/domain/VuMeet/Core/repository/GetUserChatListRepo';
import {
    FakeGetUserChatListInteractorRepo
} from '@copor/vu_meet/client/VuMeet/Core/GetUserChatList/repo/fake/FakeGetUserChatListInteractorRepo';

import {
    KyselyGetUserChatListInteractorRepo
} from '@copor/vu_meet/client/VuMeet/Core/GetUserChatList/repo/kysely/KyselyGetUserChatListInteractorRepo';

export class GetUserChatListInteractorRepoPicker
	extends NewRepositoryPicker<GetUserChatListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetUserChatListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetUserChatListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetUserChatListInteractorRepo
		};
	}
}
