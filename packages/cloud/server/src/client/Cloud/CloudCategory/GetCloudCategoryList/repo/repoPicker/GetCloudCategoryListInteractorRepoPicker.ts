import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetCloudCategoryListInteractorRepo} from '../fake/FakeGetCloudCategoryListInteractorRepo';
import {GetCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/GetCloudCategoryDTO';
import {KyselyGetCloudCategoryListInteractorRepo}
	from '@copor/cloud/client/Cloud/CloudCategory/GetCloudCategoryList/repo/kysely/KyselyGetCloudCategoryListInteractorRepo';

export class GetCloudCategoryListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetCloudCategoryDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetCloudCategoryDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetCloudCategoryListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetCloudCategoryListInteractorRepo
		};
	}
}
