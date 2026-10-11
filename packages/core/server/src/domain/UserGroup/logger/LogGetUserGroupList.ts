import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetUserGroupList extends NoDataLogger {
	getType(): string {
		return 'getUserGroupList';
	}
}
