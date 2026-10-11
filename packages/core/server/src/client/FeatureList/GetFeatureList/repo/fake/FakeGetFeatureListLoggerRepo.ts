import {NoDataLoggerRepository} from '@copor/core/client/GlobalRepository/NoDataLoggerRepository';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';

export class FakeGetFeatureListLoggerRepo implements NoDataLoggerRepository {
	save(logDTO: LogForSaveWithNoData): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
