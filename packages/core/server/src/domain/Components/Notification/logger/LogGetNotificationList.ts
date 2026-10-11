import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetNotificationList extends NoDataLogger {
	getType(): string {
		return 'getNotificationList';
	}
}
