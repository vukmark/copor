import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetPasswordSystemSettings extends NoDataLogger {
	public getType(): string {
		return 'getPasswordSystemSettings';
	}
}
