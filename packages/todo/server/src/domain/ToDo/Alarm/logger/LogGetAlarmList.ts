import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetAlarmList extends NoDataLogger {
	public getType(): string {
		return 'getAlarmList';
	}
}