import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/GetCloudCategoryDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetCloudCategoryListInteractorRepo implements ListItems<GetCloudCategoryDTO> {
	public list(input: ListRepoInputDTO): Promise<GetCloudCategoryDTO[]> {
		return Promise.resolve([
			{
				id: '1',
				name: 'Math Resources',
				description: 'Educational resources for mathematics',
				publishStatus: PublishStatus.published,
				categoryType: CategoryType.facility
			},
			{
				id: '2',
				name: 'Science Materials',
				description: 'Materials related to science topics',
				publishStatus: PublishStatus.published,
				categoryType: CategoryType.facility
			}
		]);
	}
}
