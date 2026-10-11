import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForRequestAccountDeletion} from '@copor/core/domain/User/logger/LogRequestAccountDeletion';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeRequestAccountDeletionLoggerRepo implements LogRepository<LogDataForRequestAccountDeletion> {
	save(logDto: LogForSave<LogDataForRequestAccountDeletion>): Promise<void> {
		return Promise.resolve();
	}
}
