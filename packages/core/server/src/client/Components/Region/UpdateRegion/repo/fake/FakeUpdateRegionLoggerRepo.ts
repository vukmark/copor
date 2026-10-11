import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateRegion} from '@copor/core/domain/Components/Region/logger/LogCreateRegion';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeUpdateRegionLoggerRepo implements LogRepository<LogDataForCreateRegion> {
	save(logDTO: LogForSave<LogDataForCreateRegion>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
