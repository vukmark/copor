import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetNewsListInteractorRepo} from '@copor/news/client/News/GetNewsList/repo/fake/FakeGetNewsListInteractorRepo';
import {KyselyGetNewsListInteractorRepo} from '@copor/news/client/News/GetNewsList/repo/kysely/KyselyGetNewsListInteractorRepo';

export class GetNewsListInteractorRepoPicker
	extends NewRepositoryPicker<ListItems<GetNewsDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetNewsDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetNewsListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetNewsListInteractorRepo
		};
	}
}