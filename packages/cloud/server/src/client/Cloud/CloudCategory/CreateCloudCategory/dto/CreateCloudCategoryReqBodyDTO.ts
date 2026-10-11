import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';

export interface CreateCloudCategoryReqBodyDTO {
	name: string;
	description?: string;
	publishStatus: PublishStatus;
	categoryType: CategoryType;
}
