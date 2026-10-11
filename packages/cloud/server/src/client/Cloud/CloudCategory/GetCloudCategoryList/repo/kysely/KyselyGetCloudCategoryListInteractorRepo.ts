import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/GetCloudCategoryDTO';
import {db} from '@copor/core/client/AppDataSource';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class KyselyGetCloudCategoryListInteractorRepo implements ListItems<GetCloudCategoryDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetCloudCategoryDTO[]> {
		const rows = await db
			.selectFrom('cloudCategory')
			.select(['id', 'name', 'description', 'publishStatus', 'categoryType'])
			.execute();

		return rows.map((row) => ({
			id: row.id,
			name: row.name,
			description: row.description ?? undefined,
			publishStatus: row.publishStatus,
			categoryType: Number(row.categoryType) as CategoryType
		}));
	}
}