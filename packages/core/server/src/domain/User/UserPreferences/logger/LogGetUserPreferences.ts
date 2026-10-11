import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetUserPreferences extends NoDataLogger {
	getType(): string {
		return 'getUserPreferences';
	}
}
