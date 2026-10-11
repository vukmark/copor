import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeMarkChatMessagesSeenValidatorStorageRepo}
	from '../fake/FakeMarkChatMessagesSeenValidatorStorageRepo';
import {ValidateMarkChatMessagesSeenRepo}
	from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateMarkChatMessagesSeenRepo';
import {KyselyMarkChatMessagesSeenValidatorStorageRepo}
	from '@copor/vu_meet/client/VuMeet/Chat/MarkChatMessagesSeen/repo/kysely/KyselyMarkChatMessagesSeenValidatorStorageRepo';

export class MarkChatMessagesSeenValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateMarkChatMessagesSeenRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	ValidateMarkChatMessagesSeenRepo> {
		return {
			[DBEnv.FAKE]: FakeMarkChatMessagesSeenValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyMarkChatMessagesSeenValidatorStorageRepo
		};
	}
}
