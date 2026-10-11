import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetRegionCity} from '@copor/core/domain/Components/RegionCity/logger/LogGetRegionCity';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetRegionCityLoggerRepo implements LogRepository<LogDataForGetRegionCity> {
	save(logDTO: LogForSave<LogDataForGetRegionCity>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}