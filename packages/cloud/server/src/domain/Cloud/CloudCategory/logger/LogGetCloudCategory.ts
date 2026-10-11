import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetCloudCategory extends TypedLogger<LogDataForGetCloudCategory> {
	getType(): string {
		return 'getCloudCategory';
	}
}

export interface LogDataForGetCloudCategory {
	cloudCategoryId: string;
}
