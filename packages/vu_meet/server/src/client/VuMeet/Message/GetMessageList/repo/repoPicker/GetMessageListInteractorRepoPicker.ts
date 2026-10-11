import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetMessageListInteractorRepo} from '../fake/FakeGetMessageListInteractorRepo';
import {GetMessageListRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/GetMessageListRepo';
import {
	KyselyGetMessageListInteractorRepo
} from '@copor/vu_meet/client/VuMeet/Message/GetMessageList/repo/kysely/KyselyGetMessageListInteractorRepo';

export class GetMessageListInteractorRepoPicker
	extends NewRepositoryPicker<GetMessageListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetMessageListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetMessageListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetMessageListInteractorRepo
		};
	}
}
