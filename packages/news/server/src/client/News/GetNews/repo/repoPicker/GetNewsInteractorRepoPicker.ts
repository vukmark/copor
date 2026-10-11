import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyGetNewsInteractorRepo} from '@copor/news/client/News/GetNews/repo/kysely/KyselyGetNewsInteractorRepo';
import {FakeGetNewsInteractorRepo} from '@copor/news/client/News/GetNews/repo/fake/FakeGetNewsInteractorRepo';

export class GetNewsInteractorRepoPicker
	extends NewRepositoryPicker<GetItem<GetNewsDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetItem<GetNewsDTO>> {
		return {
			[DBEnv.KYSELY]: KyselyGetNewsInteractorRepo,
			[DBEnv.FAKE]: FakeGetNewsInteractorRepo
		};
	}
}