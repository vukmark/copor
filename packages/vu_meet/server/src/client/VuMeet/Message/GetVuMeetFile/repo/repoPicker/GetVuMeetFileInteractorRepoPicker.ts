import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetVuMeetFileInteractorRepo} from '../fake/FakeGetVuMeetFileInteractorRepo';
import {
	KyselyGetVuMeetFileInteractorRepo
} from '@copor/vu_meet/client/VuMeet/Message/GetVuMeetFile/repo/kysely/KyselyGetVuMeetFileInteractorRepo';
import {GetVuMeetFileRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/GetVuMeetFileRepo';

export class GetVuMeetFileInteractorRepoPicker extends NewRepositoryPicker<GetVuMeetFileRepo> {
	protected getRepositoryList(): Record<string, new () => GetVuMeetFileRepo> {
		return {
			[DBEnv.FAKE]: FakeGetVuMeetFileInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetVuMeetFileInteractorRepo
		};
	}
}
