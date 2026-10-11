import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetChecklistItemList extends NoDataLogger {
	getType(): string {
		return 'getChecklistItemList';
	}
}
