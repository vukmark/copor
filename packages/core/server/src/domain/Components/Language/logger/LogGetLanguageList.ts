import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetLanguageList extends NoDataLogger {
	getType(): string {
		return 'getLanguageList';
	}
}