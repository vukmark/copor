import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateCloudCategoryInteractorRepo} from '../fake/FakeUpdateCloudCategoryInteractorRepo';
import {SaveCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/SaveCloudCategoryRepo';
import {
    KyselyUpdateCloudCategoryInteractorRepo
} from '@copor/cloud/client/Cloud/CloudCategory/UpdateCloudCategory/repo/kysely/KyselyUpdateCloudCategoryInteractorRepo';

export class UpdateCloudCategoryInteractorRepoPicker extends NewRepositoryPicker<SaveCloudCategoryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveCloudCategoryRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateCloudCategoryInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateCloudCategoryInteractorRepo
		};
	}
}
