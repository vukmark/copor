import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetVuMeetContactList extends NoDataLogger {
	getType(): string {
		return 'getVuMeetContactList';
	}
}