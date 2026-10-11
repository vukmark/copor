import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveNewsDTO} from '@copor/news/domain/News/interactor/dto/SaveNewsDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateNewsInteractorRepo} from '@copor/news/client/News/CreateNews/repo/fake/FakeCreateNewsInteractorRepo';
import {KyselyCreateNewsInteractorRepo} from '@copor/news/client/News/CreateNews/repo/kysely/KyselyCreateNewsInteractorRepo';

export class CreateNewsInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveNewsDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveNewsDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateNewsInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateNewsInteractorRepo
		};
	}
}