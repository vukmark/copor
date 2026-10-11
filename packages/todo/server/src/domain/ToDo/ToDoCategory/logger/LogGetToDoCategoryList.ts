import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetToDoCategoryList extends NoDataLogger {
	getType(): string {
		return 'getToDoCategoryList';
	}
}
