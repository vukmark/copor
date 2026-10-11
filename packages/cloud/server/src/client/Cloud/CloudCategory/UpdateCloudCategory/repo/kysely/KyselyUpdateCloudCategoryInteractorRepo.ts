import {db} from '@copor/core/client/AppDataSource';
import {SaveCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/SaveCloudCategoryDTO';
import {SaveCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/SaveCloudCategoryRepo';

export class KyselyUpdateCloudCategoryInteractorRepo implements SaveCloudCategoryRepo {
	public async save(saveDTO: SaveCloudCategoryDTO): Promise<void> {
		await db
			.updateTable('cloudCategory')
			.set({
				name: saveDTO.name,
				description: saveDTO.description ?? null,
				publishStatus: saveDTO.publishStatus,
				categoryType: saveDTO.categoryType.toString()
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}