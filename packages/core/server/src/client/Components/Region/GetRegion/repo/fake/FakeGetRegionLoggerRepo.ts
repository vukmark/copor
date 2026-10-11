import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetRegion} from '@copor/core/domain/Components/Region/logger/LogGetRegion';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetRegionLoggerRepo implements LogRepository<LogDataForGetRegion> {
	save(logDTO: LogForSave<LogDataForGetRegion>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
