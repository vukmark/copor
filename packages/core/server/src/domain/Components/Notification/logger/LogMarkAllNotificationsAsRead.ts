import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogMarkAllNotificationsAsRead extends NoDataLogger {
	getType(): string {
		return 'markAllNotificationsAsRead';
	}
}
