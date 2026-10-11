import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetCloudCategoryList extends NoDataLogger {
	public getType(): string {
		return 'getCloudCategoryList';
	}
}