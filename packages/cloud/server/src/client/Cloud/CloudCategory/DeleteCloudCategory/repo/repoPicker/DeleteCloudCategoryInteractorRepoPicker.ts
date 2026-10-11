import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteCloudCategoryInteractorRepo}
	from '@copor/cloud/client/Cloud/CloudCategory/DeleteCloudCategory/repo/fake/FakeDeleteCloudCategoryInteractorRepo';
import {KyselyDeleteCloudCategoryInteractorRepo}
	from '@copor/cloud/client/Cloud/CloudCategory/DeleteCloudCategory/repo/kysely/KyselyDeleteCloudCategoryInteractorRepo';

export class DeleteCloudCategoryInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteCloudCategoryInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteCloudCategoryInteractorRepo
		};
	}
}
