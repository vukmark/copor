import {SaveCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/SaveCloudCategoryDTO';
import {SaveCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/SaveCloudCategoryRepo';

export class FakeCreateCloudCategoryInteractorRepo implements SaveCloudCategoryRepo {
	save(saveDTO: SaveCloudCategoryDTO): Promise<void> {
		return Promise.resolve();
	}
}