import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetCountryList extends NoDataLogger {
	getType(): string {
		return 'getCountryList';
	}
}
