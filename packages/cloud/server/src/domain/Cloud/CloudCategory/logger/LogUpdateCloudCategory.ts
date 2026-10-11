import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';

export class LogUpdateCloudCategory extends TypedLogger<LogDataForUpdateCloudCategory> {
	getType(): string {
		return 'updateCloudCategory';
	}
}

export interface LogDataForUpdateCloudCategory {
	id: string,
	name: string;
	description?: string;
	publishStatus: PublishStatus;
	categoryType: CategoryType;
	actorId: string;
}
