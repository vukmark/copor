import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetSMTPSystemSettings extends NoDataLogger {
	public getType(): string {
		return 'getSMTPSystemSettings';
	}
}
