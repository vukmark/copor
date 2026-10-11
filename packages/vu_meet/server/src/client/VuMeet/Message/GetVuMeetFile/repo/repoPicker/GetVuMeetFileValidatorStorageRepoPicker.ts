import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';

import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetVuMeetFileValidatorStorageRepo} from '../fake/FakeGetVuMeetFileValidatorStorageRepo';
import {ValidateGetVuMeetFileRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateGetVuMeetFileRepo';
import {
	KyselyGetVuMeetFileValidatorStorageRepo
} from '@copor/vu_meet/client/VuMeet/Message/GetVuMeetFile/repo/kysely/KyselyGetVuMeetFileValidatorStorageRepo';

export class GetVuMeetFileValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetVuMeetFileRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateGetVuMeetFileRepo> {
		return {
			[DBEnv.FAKE]: FakeGetVuMeetFileValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetVuMeetFileValidatorStorageRepo
		};
	}
}
