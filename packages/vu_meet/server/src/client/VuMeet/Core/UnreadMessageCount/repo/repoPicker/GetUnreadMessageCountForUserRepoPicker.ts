import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetUnreadMessageCountForUserRepo}
	from '@copor/vu_meet/domain/VuMeet/Core/repository/GetUnreadMessageCountForUserRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUnreadMessageCountForUserInteractorRepo} from '@copor/vu_meet/client/VuMeet/Core/UnreadMessageCount/repo/fake/FakeGetUnreadMessageCountForUserInteractorRepo';
import {
	KyselyGetUnreadMessageCountForUserInteractorRepo
} from '@copor/vu_meet/client/VuMeet/Core/UnreadMessageCount/repo/kysely/KyselyGetUnreadMessageCountForUserInteractorRepo';

export class GetUnreadMessageCountForUserRepoPicker extends NewRepositoryPicker<GetUnreadMessageCountForUserRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetUnreadMessageCountForUserRepo> {
		return {
			[DBEnv.FAKE]: FakeGetUnreadMessageCountForUserInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetUnreadMessageCountForUserInteractorRepo
		};
	}
}
