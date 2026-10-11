import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';

export class FakeGetNativeLanguageListLoggerRepo implements NoDataLogRepository {
	save(logDto: LogForSaveWithNoData): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
