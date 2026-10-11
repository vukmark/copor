import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogDeleteUserPreferences extends NoDataLogger {
	getType(): string {
		return 'deleteUserPreferences';
	}
}
