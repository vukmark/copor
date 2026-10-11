import {SaveCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/SaveCloudCategoryDTO';
import {SaveCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/SaveCloudCategoryRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyCreateCloudCategoryInteractorRepo implements SaveCloudCategoryRepo {
	async save(saveDTO: SaveCloudCategoryDTO): Promise<void> {
		await db
			.insertInto('cloudCategory')
			.values({
				id: saveDTO.id,
				name: saveDTO.name,
				description: saveDTO.description ?? null,
				publishStatus: saveDTO.publishStatus,
				categoryType: saveDTO.categoryType.toString()
			})
			.execute();
	}
}