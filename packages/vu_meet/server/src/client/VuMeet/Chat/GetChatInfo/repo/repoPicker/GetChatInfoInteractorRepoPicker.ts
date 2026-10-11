import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetChatInfoInteractorRepo} from '../fake/FakeGetChatInfoInteractorRepo';
import {GetChatInfoDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/GetChatInfoDTO';
import {KyselyGetChatInfoInteractorRepo} from '@copor/vu_meet/client/VuMeet/Chat/GetChatInfo/repo/kysely/KyselyGetChatInfoInteractorRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class GetChatInfoInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetChatInfoDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetItem<GetChatInfoDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetChatInfoInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetChatInfoInteractorRepo
		};
	}
}
