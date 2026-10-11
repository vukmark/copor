import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateCloudCategoryInteractorRepo}
	from '@copor/cloud/client/Cloud/CloudCategory/CreateCloudCategory/repo/fake/FakeCreateCloudCategoryInteractorRepo';
import {SaveCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/SaveCloudCategoryDTO';
import {KyselyCreateCloudCategoryInteractorRepo}
	from '@copor/cloud/client/Cloud/CloudCategory/CreateCloudCategory/repo/kysely/KyselyCreateCloudCategoryInteractorRepo';

export class CreateCloudCategoryInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveCloudCategoryDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveCloudCategoryDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateCloudCategoryInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateCloudCategoryInteractorRepo
		};
	}
}
