import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetDisplaySystemSettings extends NoDataLogger {
	public getType(): string {
		return 'getDisplaySystemSettings';
	}
}
