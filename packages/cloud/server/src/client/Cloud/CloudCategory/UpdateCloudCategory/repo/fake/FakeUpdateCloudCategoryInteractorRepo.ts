import {SaveCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/SaveCloudCategoryRepo';
import {SaveCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/SaveCloudCategoryDTO';


export class FakeUpdateCloudCategoryInteractorRepo implements SaveCloudCategoryRepo {
	save(saveDTO: SaveCloudCategoryDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
