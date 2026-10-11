import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {
    LogDataForDeleteNotificationToken
} from '@copor/core/domain/Components/NotificationToken/logger/LogDeleteNotificationToken';

export class FakeDeleteNotificationTokenLoggerRepo implements LogRepository<LogDataForDeleteNotificationToken> {
	save(logDTO: LogForSave<LogDataForDeleteNotificationToken>): Promise<void> {
		return Promise.resolve();
	}
}
