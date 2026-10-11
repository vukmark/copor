import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetAllTagsForUser extends NoDataLogger {
	getType(): string {
		return 'getAllTagsForUser';
	}
}
