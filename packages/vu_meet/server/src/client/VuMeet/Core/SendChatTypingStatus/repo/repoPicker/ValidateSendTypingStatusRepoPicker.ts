import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateSendTypingStatusRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/ValidateSendTypingStatusRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeValidateSendTypingStatusRepo
} from '@copor/vu_meet/client/VuMeet/Core/SendChatTypingStatus/repo/fake/FakeValidateSendTypingStatusRepo';
import {
	KyselyValidateSendTypingStatusRepo
} from '@copor/vu_meet/client/VuMeet/Core/SendChatTypingStatus/repo/kysely/KyselyValidateSendTypingStatusRepo';

export class ValidateSendTypingStatusRepoPicker
	extends NewRepositoryPicker<ValidateSendTypingStatusRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateSendTypingStatusRepo> {
		return {
			[DBEnv.FAKE]: FakeValidateSendTypingStatusRepo,
			[DBEnv.KYSELY]: KyselyValidateSendTypingStatusRepo
		};
	}
}
