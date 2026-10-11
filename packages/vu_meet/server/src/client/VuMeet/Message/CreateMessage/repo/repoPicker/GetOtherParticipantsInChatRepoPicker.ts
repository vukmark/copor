import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetOtherParticipantsInChatRepo}
	from '@copor/vu_meet/domain/VuMeet/Core/repository/GetOtherParticipantsInChatRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetOtherParticipantsInChatRepo} from '../fake/FakeGetOtherParticipantsInChatRepo';
import {
	KyselyGetOtherParticipantsInChatRepo
} from '@copor/vu_meet/client/VuMeet/Message/CreateMessage/repo/kysely/KyselyGetOtherParticipantsInChatRepo';

export class GetOtherParticipantsInChatRepoPicker
	extends NewRepositoryPicker<GetOtherParticipantsInChatRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetOtherParticipantsInChatRepo> {
		return {
			[DBEnv.FAKE]: FakeGetOtherParticipantsInChatRepo,
			[DBEnv.KYSELY]: KyselyGetOtherParticipantsInChatRepo
		};
	}
}
