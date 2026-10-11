import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetVuMeetUserDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetVuMeetUserDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeGetVuMeetUserInteractorRepo
} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/repo/fake/FakeGetVuMeetUserInteractorRepo';
import {
	KyselyGetVuMeetUserInteractorRepo
} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/repo/kysely/KyselyGetVuMeetUserInteractorRepo';

export class GetVuMeetUserInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetVuMeetUserDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetItem<GetVuMeetUserDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetVuMeetUserInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetVuMeetUserInteractorRepo
		};
	}
}