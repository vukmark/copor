import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/GetCloudCategoryDTO';
import {db} from '@copor/core/client/AppDataSource';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';

export class KyselyGetCloudCategoryInteractorRepo implements GetItem<GetCloudCategoryDTO> {
	public async load(id: string): Promise<GetCloudCategoryDTO> {
		const row = await db
			.selectFrom('cloudCategory')
			.select([
				'id',
				'name',
				'description',
				'publishStatus',
				'categoryType'
			])
			.where('id', '=', id)
			.executeTakeFirst();

		if (!row) {
			throw new Error(`Cloud category with id ${id} not found`);
		}

		return {
			id: row.id,
			name: row.name,
			description: row.description ?? undefined,
			publishStatus: row.publishStatus,
			categoryType: Number(row.categoryType) as CategoryType
		};
	}
}