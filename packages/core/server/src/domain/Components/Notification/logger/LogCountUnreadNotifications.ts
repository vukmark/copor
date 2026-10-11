import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogCountUnreadNotifications extends NoDataLogger {
	getType(): string {
		return 'countUnreadNotifications';
	}
}
