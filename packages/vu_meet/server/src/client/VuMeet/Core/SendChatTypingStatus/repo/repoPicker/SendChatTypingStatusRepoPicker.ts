import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SendTypingStatusRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/SendTypingStatusRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
    FakeSendChatTypingStatusRepo
} from '@copor/vu_meet/client/VuMeet/Core/SendChatTypingStatus/repo/fake/FakeSendChatTypingStatusRepo';
import {
    KyselySendChatTypingStatusRepo
} from '@copor/vu_meet/client/VuMeet/Core/SendChatTypingStatus/repo/kysely/KyselySendChatTypingStatusRepo';

export class SendChatTypingStatusRepoPicker
	extends NewRepositoryPicker<SendTypingStatusRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SendTypingStatusRepo> {
		return {
			[DBEnv.FAKE]: FakeSendChatTypingStatusRepo,
			[DBEnv.KYSELY]: KyselySendChatTypingStatusRepo
		};
	}
}
