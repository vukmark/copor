import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCancelAccountDeletion} from '@copor/core/domain/User/logger/LogCancelAccountDeletion';

export class FakeCancelAccountDeletionLoggerRepo implements LogRepository<LogDataForCancelAccountDeletion> {
	save(): Promise<void> {
		return Promise.resolve();
	}
}
