import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteRegion} from '@copor/core/domain/Components/Region/logger/LogDeleteRegion';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeDeleteRegionLoggerRepo implements LogRepository<LogDataForDeleteRegion> {
	save(logDTO: LogForSave<LogDataForDeleteRegion>): Promise<void> {
		return Promise.resolve();
	}
}