import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetRegionCityList extends NoDataLogger {
	public getType(): string {
		return 'getRegionCityList';
	}
}