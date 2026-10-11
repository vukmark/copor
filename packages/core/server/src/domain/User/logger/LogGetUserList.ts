import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetUserList extends NoDataLogger {
	public getType(): string {
		return 'getUserList';
	}
}