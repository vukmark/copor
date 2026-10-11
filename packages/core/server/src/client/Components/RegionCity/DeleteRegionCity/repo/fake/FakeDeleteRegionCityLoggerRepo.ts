import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteRegionCity} from '@copor/core/domain/Components/RegionCity/logger/LogDeleteRegionCity';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeDeleteRegionCityLoggerRepo implements LogRepository<LogDataForDeleteRegionCity> {
	save(logDTO: LogForSave<LogDataForDeleteRegionCity>): Promise<void> {
		return Promise.resolve();
	}
}