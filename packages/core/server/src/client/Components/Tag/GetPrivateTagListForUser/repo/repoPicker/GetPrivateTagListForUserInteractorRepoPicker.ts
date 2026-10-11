import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetPrivateTagListForUserInteractorRepo} from '../fake/FakeGetPrivateTagListForUserInteractorRepo';
import {GetPrivateTagListForUserRepo} from '@copor/core/domain/Components/Tag/repository/GetPrivateTagListForUserRepo';
import {
	KyselyGetPrivateTagListForUserInteractorRepo
} from '@copor/core/client/Components/Tag/GetPrivateTagListForUser/repo/kysely/KyselyGetPrivateTagListForUserInteractorRepo';

export class GetPrivateTagListForUserInteractorRepoPicker
	extends NewRepositoryPicker<GetPrivateTagListForUserRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> GetPrivateTagListForUserRepo> {
		return {
			[DBEnv.FAKE]: FakeGetPrivateTagListForUserInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetPrivateTagListForUserInteractorRepo
		};
	}
}
