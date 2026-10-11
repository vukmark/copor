import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetPublicTagList extends NoDataLogger {
	getType(): string {
		return 'getPublicTagList';
	}
}