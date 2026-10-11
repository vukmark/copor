import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetUserGroupTree extends NoDataLogger {
	getType(): string {
		return 'getUserGroupTree';
	}
}
