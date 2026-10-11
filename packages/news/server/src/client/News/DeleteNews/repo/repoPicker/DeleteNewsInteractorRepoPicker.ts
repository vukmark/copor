import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteNewsInteractorRepo} from '@copor/news/client/News/DeleteNews/repo/fake/FakeDeleteNewsInteractorRepo';
import {KyselyDeleteNewsInteractorRepo} from '@copor/news/client/News/DeleteNews/repo/kysely/KyselyDeleteNewsInteractorRepo';

export class DeleteNewsInteractorRepoPicker extends
	NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteNewsInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteNewsInteractorRepo
		};
	}
}