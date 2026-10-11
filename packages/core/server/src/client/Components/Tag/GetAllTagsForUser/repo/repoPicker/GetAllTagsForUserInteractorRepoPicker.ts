import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {GetPrivateTagListForUserRepo} from '@copor/core/domain/Components/Tag/repository/GetPrivateTagListForUserRepo';
import {
	FakeGetAllTagsForUserInteractorRepo
} from '@copor/core/client/Components/Tag/GetAllTagsForUser/repo/fake/FakeGetAllTagsForUserInteractorRepo';
import {
	KyselyGetAllTagsForUserInteractorRepo
} from '@copor/core/client/Components/Tag/GetAllTagsForUser/repo/kysely/KyselyGetAllTagsForUserInteractorRepo';

export class GetAllTagsForUserInteractorRepoPicker
	extends NewRepositoryPicker<GetPrivateTagListForUserRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> GetPrivateTagListForUserRepo> {
		return {
			[DBEnv.FAKE]: FakeGetAllTagsForUserInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetAllTagsForUserInteractorRepo
		};
	}
}
