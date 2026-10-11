import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetGlobalSystemSettings extends NoDataLogger {
	public getType(): string {
		return 'getGlobalSystemSettings';
	}
}
