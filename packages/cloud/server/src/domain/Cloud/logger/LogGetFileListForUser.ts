import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetFileListForUser extends NoDataLogger {
	getType(): string {
		return 'getFileListForUser';
	}
}
