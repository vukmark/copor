import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetStateTableList extends NoDataLogger {
	public getType(): string {
		return 'getStateTableList';
	}
}
