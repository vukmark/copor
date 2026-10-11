import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetContentItemList extends NoDataLogger {
	public getType(): string {
		return 'getContentItemList';
	}
}