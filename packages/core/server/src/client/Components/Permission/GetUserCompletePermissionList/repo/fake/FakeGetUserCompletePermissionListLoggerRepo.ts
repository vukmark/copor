import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';

export class FakeGetUserCompletePermissionListLoggerRepo implements NoDataLogRepository {
	save(logDto: LogForSaveWithNoData): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
