import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';

export interface ValidateCreateCloudCategoryDTO {
	name: string;
	description?: string;
	publishStatus: PublishStatus;
	categoryType: CategoryType;
	actorId: string;
}