import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetNotifierSystemSettings extends NoDataLogger {
	public getType(): string {
		return 'getNotifierSystemSettings';
	}
}
