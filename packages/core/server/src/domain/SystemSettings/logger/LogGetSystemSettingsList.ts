import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetSystemSettingsList extends NoDataLogger {
	getType(): string {
		return 'getSystemSettingsList';
	}
}
