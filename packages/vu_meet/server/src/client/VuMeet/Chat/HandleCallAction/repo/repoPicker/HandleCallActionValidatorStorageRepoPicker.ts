import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ValidateStartPrivateCallRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateStartPrivateCallRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeHandleCallActionValidatorStorageRepo
} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/repo/fake/FakeHandleCallActionValidatorStorageRepo';
import {
	KyselyHandleCallActionValidatorStorageRepo
} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/repo/kysely/KyselyHandleCallActionValidatorStorageRepo';

export class HandleCallActionValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateStartPrivateCallRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateStartPrivateCallRepo> {
		return {
			[DBEnv.FAKE]: FakeHandleCallActionValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyHandleCallActionValidatorStorageRepo
		};
	}
}