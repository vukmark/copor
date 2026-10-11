import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteCloudCategory extends TypedLogger<LogDataForDeleteCloudCategory> {
	getType(): string {
		return 'deleteCloudCategory';
	}
}
export interface LogDataForDeleteCloudCategory {
	cloudCategoryId: string;
}
