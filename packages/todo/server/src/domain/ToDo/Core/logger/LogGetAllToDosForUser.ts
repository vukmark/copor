import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetAllToDosForUser extends NoDataLogger {
	getType(): string {
		return 'getAllToDosForUser';
	}
}
