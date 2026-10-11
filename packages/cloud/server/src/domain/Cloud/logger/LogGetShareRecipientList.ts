import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetShareRecipientList extends NoDataLogger {
	getType(): string {
		return 'getShareRecipientList';
	}
}
