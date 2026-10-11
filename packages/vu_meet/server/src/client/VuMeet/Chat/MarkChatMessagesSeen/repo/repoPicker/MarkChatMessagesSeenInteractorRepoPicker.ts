import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeMarkChatMessagesSeenInteractorRepo} from '../fake/FakeMarkChatMessagesSeenInteractorRepo';
import {MarkChatMessagesSeenRepo}
	from '@copor/vu_meet/domain/VuMeet/Chat/repository/MarkChatMessagesSeenRepo';
import {
	KyselyMarkChatMessagesSeenInteractorRepo
} from '@copor/vu_meet/client/VuMeet/Chat/MarkChatMessagesSeen/repo/kysely/KyselyMarkChatMessagesSeenInteractorRepo';

export class MarkChatMessagesSeenInteractorRepoPicker
	extends NewRepositoryPicker<MarkChatMessagesSeenRepo> {
	protected getRepositoryList(): Record<string, new () => MarkChatMessagesSeenRepo> {
		return {
			[DBEnv.FAKE]: FakeMarkChatMessagesSeenInteractorRepo,
			[DBEnv.KYSELY]: KyselyMarkChatMessagesSeenInteractorRepo
		};
	}
}
