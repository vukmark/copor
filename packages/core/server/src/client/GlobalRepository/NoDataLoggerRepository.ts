import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';

export class NoDataLoggerRepository implements NoDataLogRepository {
	public save(logDetails: LogForSaveWithNoData): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}