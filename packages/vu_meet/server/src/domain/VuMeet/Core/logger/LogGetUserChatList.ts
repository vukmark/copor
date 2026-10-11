import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetUserChatList extends NoDataLogger {
	getType(): string {
		return 'getUserChatList';
	}
}
