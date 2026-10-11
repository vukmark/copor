import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetContactList extends NoDataLogger {
	getType(): string {
		return 'getContactList';
	}
}