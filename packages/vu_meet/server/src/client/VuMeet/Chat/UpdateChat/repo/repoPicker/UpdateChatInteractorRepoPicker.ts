import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateChatInteractorRepo} from '../fake/FakeUpdateChatInteractorRepo';
import {SaveChatRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/SaveChatRepo';
import {
	KyselyUpdateChatInteractorRepo
} from '@copor/vu_meet/client/VuMeet/Chat/UpdateChat/repo/kysely/KyselyUpdateChatInteractorRepo';

export class UpdateChatInteractorRepoPicker extends NewRepositoryPicker<SaveChatRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveChatRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateChatInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateChatInteractorRepo
		};
	}
}
