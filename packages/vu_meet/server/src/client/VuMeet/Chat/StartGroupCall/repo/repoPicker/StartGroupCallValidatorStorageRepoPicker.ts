import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeStartGroupCallValidatorStorageRepo
} from '@copor/vu_meet/client/VuMeet/Chat/StartGroupCall/repo/fake/FakeStartGroupCallValidatorStorageRepo';
import {
	KyselyStartGroupCallValidatorStorageRepo
} from '@copor/vu_meet/client/VuMeet/Chat/StartGroupCall/repo/kysely/KyselyStartGroupCallValidatorStorageRepo';
import {ValidateStartPrivateCallRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateStartPrivateCallRepo';

export class StartGroupCallValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateStartPrivateCallRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateStartPrivateCallRepo> {
		return {
			[DBEnv.FAKE]: FakeStartGroupCallValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyStartGroupCallValidatorStorageRepo
		};
	}
}