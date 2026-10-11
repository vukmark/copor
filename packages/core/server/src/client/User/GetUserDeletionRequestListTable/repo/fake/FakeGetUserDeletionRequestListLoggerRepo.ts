import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';

export class FakeGetUserDeletionRequestListLoggerRepo implements NoDataLogRepository {
	save(logDto: LogForSaveWithNoData): Promise<void> {
		return Promise.resolve();
	}
}
