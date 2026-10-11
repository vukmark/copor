import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogEmptyTrash extends NoDataLogger {
	public getType(): string {
		return 'emptyTrash';
	}
}