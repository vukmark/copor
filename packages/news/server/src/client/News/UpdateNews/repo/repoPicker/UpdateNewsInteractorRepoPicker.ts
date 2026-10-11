import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveNewsRepo} from '@copor/news/domain/News/repository/SaveNewsRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateNewsInteractorRepo} from '@copor/news/client/News/UpdateNews/repo/fake/FakeUpdateNewsInteractorRepo';
import {KyselyUpdateNewsInteractorRepo} from '@copor/news/client/News/UpdateNews/repo/kysely/KyselyUpdateNewsInteractorRepo';

export class UpdateNewsInteractorRepoPicker extends NewRepositoryPicker<SaveNewsRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveNewsRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateNewsInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateNewsInteractorRepo
		};
	}
}