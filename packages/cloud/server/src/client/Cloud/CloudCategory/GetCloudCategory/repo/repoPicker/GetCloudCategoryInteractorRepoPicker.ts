import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetCloudCategoryInteractorRepo} from '../fake/FakeGetCloudCategoryInteractorRepo';
import {GetCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/GetCloudCategoryDTO';
import {KyselyGetCloudCategoryInteractorRepo}
	from '@copor/cloud/client/Cloud/CloudCategory/GetCloudCategory/repo/kysely/KyselyGetCloudCategoryInteractorRepo';

export class GetCloudCategoryInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetCloudCategoryDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetCloudCategoryDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetCloudCategoryInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetCloudCategoryInteractorRepo
		};
	}
}
