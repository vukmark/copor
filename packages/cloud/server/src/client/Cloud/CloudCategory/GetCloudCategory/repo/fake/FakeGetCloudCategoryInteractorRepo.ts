import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/GetCloudCategoryDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';

export class FakeGetCloudCategoryInteractorRepo implements GetItem<GetCloudCategoryDTO> {
	load(id: string): Promise<GetCloudCategoryDTO> {
		return Promise.resolve({
			id: '12345',
			name: 'Cloud Storage',
			description: 'Category for cloud storage related services',
			publishStatus: PublishStatus.published,
			categoryType: CategoryType.facility
		});
	}
}