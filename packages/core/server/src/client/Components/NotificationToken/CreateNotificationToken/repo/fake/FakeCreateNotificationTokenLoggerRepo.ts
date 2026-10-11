import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateNotificationToken}
	from '@copor/core/domain/Components/NotificationToken/logger/LogCreateNotificationToken';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeCreateNotificationTokenLoggerRepo implements LogRepository<LogDataForCreateNotificationToken> {
	save(logDTO: LogForSave<LogDataForCreateNotificationToken>): Promise<void> {
		return Promise.resolve();
	}
}
