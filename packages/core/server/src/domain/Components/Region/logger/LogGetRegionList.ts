import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetRegionList extends NoDataLogger {
	public getType(): string {
		return 'getRegionList';
	}
}