import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';

export class FakeGetUserPreferencesLoggerRepo implements NoDataLogRepository {
	save(logDTO: LogForSaveWithNoData): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
