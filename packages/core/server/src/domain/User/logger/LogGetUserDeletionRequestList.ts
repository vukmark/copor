import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetUserDeletionRequestList extends NoDataLogger {
	public getType(): string {
		return 'getUserDeletionRequestList';
	}
}
