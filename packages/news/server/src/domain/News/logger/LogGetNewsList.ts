import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetNewsList extends NoDataLogger {
	public getType(): string {
		return 'getNewsList';
	}
}