import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSearchTagListInteractorRepo} from '../fake/FakeSearchTagListInteractorRepo';
import {SearchTagRepo} from '@copor/core/domain/Components/Tag/repository/SearchTagRepo';
import {
	KyselySearchTagListInteractorRepo
} from '@copor/core/client/Components/Tag/SearchTagList/repo/kysely/KyselySearchTagListInteractorRepo';

export class SearchTagListInteractorRepoPicker extends NewRepositoryPicker<SearchTagRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SearchTagRepo> {
		return {
			[DBEnv.FAKE]: FakeSearchTagListInteractorRepo,
			[DBEnv.KYSELY]: KyselySearchTagListInteractorRepo
		};
	}
}
