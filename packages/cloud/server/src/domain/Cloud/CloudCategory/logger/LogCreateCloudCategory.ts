import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';
import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateCloudCategory extends TypedLogger<LogDataForCreateCloudCategory> {
	getType(): string {
		return 'createCloudCategory';
	}
}

export interface LogDataForCreateCloudCategory {
	name: string;
	description?: string;
	publishStatus: PublishStatus;
	categoryType: CategoryType;
	actorId: string;
}
