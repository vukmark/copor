import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface CreateCloudCategoryDTO {
	name: string;
	description?: string;
	publishStatus: PublishStatus;
	categoryType: CategoryType;
	actorId: string;
}