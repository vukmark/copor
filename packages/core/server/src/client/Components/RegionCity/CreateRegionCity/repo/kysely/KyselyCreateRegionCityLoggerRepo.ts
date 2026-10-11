import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateRegionCity} from '@copor/core/domain/Components/RegionCity/logger/LogCreateRegionCity';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class KyselyCreateRegionCityLoggerRepo implements LogRepository<LogDataForCreateRegionCity> {
	save(logDTO: LogForSave<LogDataForCreateRegionCity>): Promise<void> {
		return Promise.resolve();
	}
}