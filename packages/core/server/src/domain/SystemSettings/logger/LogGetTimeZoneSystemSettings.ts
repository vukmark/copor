import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetTimeZoneSystemSettings extends NoDataLogger {
	public getType(): string {
		return 'getTimeZoneSystemSettings';
	}
}
