import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetLogList extends NoDataLogger {
	getType(): string {
		return 'getLogList';
	}
}
