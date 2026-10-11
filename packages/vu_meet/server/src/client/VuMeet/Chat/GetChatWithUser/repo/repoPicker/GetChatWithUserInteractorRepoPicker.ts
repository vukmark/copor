import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetChatWithUserInteractorRepo} from '../fake/FakeGetChatWithUserInteractorRepo';
import {GetChatWithUserRepo}
	from '@copor/vu_meet/domain/VuMeet/Chat/repository/GetChatWithUserRepo';
import {
	KyselyGetChatWithUserInteractorRepo
} from '@copor/vu_meet/client/VuMeet/Chat/GetChatWithUser/repo/kysely/KyselyGetChatWithUserInteractorRepo';

export class GetChatWithUserInteractorRepoPicker
	extends NewRepositoryPicker<GetChatWithUserRepo> {
	protected getRepositoryList(): Record<string, new () => GetChatWithUserRepo> {
		return {
			[DBEnv.FAKE]: FakeGetChatWithUserInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetChatWithUserInteractorRepo
		};
	}
}
